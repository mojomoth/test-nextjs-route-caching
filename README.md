# Next.JS 14버전의 App Router 캐싱 문제

> https://nextjs.org/docs/app/building-your-application/routing/route-handlers

Route Handlers(route.ts, route.js)를 이용하여 API를 개발시 GET 메소드를 사용하는 경우 캐싱에 주의해야함

기본적으로 GET메소드는 캐싱을 하게되며 빌드타임에 스크립트가 동작하고 이후 요청시 로직을 실행하지 않음 ([링크 참조](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#caching))

아래는 NEXT.js의 가이드에서 캐싱을 피하는 방법 ([링크 참조](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#opting-out-of-caching))

- Using the Request object with the GET method.
- Using any of the other HTTP methods.
- Using Dynamic Functions like cookies and headers.
- The Segment Config Options manually specifies dynamic mode.

**⚠️ 그러나 가이드에서 알려주지 않은 방법으로도 캐싱이 되지 않은 경우가 있음**

- **스크립트에 GET메소드와 함께 다른 메소드(PUT, POST ...)가 함께 있는 경우 캐싱이 되지 않음**
- **요청 파라미터(Query string, Path parameter)를 사용하는 코드가 함께 있는 경우 캐싱이 되지 않음**

💡**결론: 순수 GET 메소드(요청 파라미터, 쿠키, 헤더가 없는)만 캐싱이 된다.**

캐싱이 되는 경우와 안되는 경우를 구분해서 Route Handler를 사용해야함

---

1. 캐싱이 되는 경우 : GET 메소드를 사용하며 header, cookie 또는 요청 파라미터 관련 로직이 없음

   [테스트 : 순수 GET - 캐싱됨, 랜덤값이 변경되지 않음](https://test-nextjs-route-caching-fdvsqueen-mojomoths-projects.vercel.app/test/simple1)

   ```
   export async function GET() {
     return Response.json({
       ramdom: Math.random(),
       desc: "This route is cachced and only uses `GET` method.",
     });
   }

   ```

2. 캐싱이 되는 않은 경우 : GET 메소드를 사용하지만 스크립트에 POST 메소드가 함께 있음

   [테스트 : 스크립트에 GET, POST 동시 존재 - 캐싱되지 않음, 랜덤값이 변경됨](https://test-nextjs-route-caching-fdvsqueen-mojomoths-projects.vercel.app/test/simple2)

   ```
   export async function GET() {
     return Response.json({
       ramdom: Math.random(),
       desc: "This route is not cachced and is just script with `POST` method.",
     });
   }

   export async function POST() {
     return Response.json({ foo: "bar" });
   }

   ```

3. 캐싱이 되는 않은 경우 : GET 메소드를 사용하지만 스크립트에 headers함수가 존재함

   [테스트 : headers 함수 - 캐싱되지 않음, 랜덤값이 변경됨](https://test-nextjs-route-caching-fdvsqueen-mojomoths-projects.vercel.app/test/simple3)

   ```
   import { headers } from "next/headers";

   export async function GET() {
     headers();
     return Response.json({
       ramdom: Math.random(),
       desc: "This route is not cachced and is just script with header function.",
     });
   }

   ```

4. 캐싱이 되는 않은 경우 : GET 외의 다른 메소드를 사용

   테스트 : 순수 POST - 캐싱되지 않음, 랜덤값이 변경됨

   ```
   curl -XPOST https://test-nextjs-route-caching-fdvsqueen-mojomoths-projects.vercel.app/test/simple4
   ```

   ```
   export async function POST() {
     return Response.json({
       ramdom: Math.random(),
       desc: "This route is not cachced and only uses `POST` method.",
     });
   }


   ```

5. 캐싱이 되는 않은 경우 : GET 메소드를 사용하지만 쿼리 파라미터 로직이 존재

   [테스트 : query paramter - 캐싱되지 않음, 랜덤값이 변경됨](https://test-nextjs-route-caching-fdvsqueen-mojomoths-projects.vercel.app/test/simple5?q=1)

   ```
   import { type NextRequest } from "next/server";

   export async function GET(req: NextRequest) {
     const searchParams = req.nextUrl.searchParams;
     const query = searchParams.get("query");

     return Response.json({
       ramdom: Math.random(),
       desc: "This route is not cachced and only uses `GET` method with query params.",
     });
   }

   ```

6. 캐싱이 되는 않은 경우 : GET 메소드를 사용하지만 파라미터 라우터를 사용

   [테스트 : query paramter - 캐싱되지 않음, 랜덤값이 변경됨](https://test-nextjs-route-caching-fdvsqueen-mojomoths-projects.vercel.app/test/simple1/test)

   ```
   import { type NextRequest } from "next/server";

   export async function GET(
     req: NextRequest,
     { params }: { params: { id: string } }
   ) {
     return Response.json({
       ramdom: Math.random(),
       params,
       desc: "This route is not cachced and only uses `GET` method with params.",
     });
   }


   ```
