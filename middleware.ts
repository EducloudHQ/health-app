import { fetchAuthSession } from "aws-amplify/auth/server";
import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./utils/server-utils";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { AmplifyServer } from "aws-amplify/adapter-core";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  try {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec: AmplifyServer.ContextSpec) => getCurrentUser(contextSpec),
    });
  } catch (err) {
    console.log(err);
  }
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec: AmplifyServer.ContextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return (
          session.tokens?.accessToken !== undefined &&
          session.tokens?.idToken !== undefined
        );
      } catch (error) {
        console.log("Error", error);
        return false;
      }
    },
  });
  if (authenticated) {
    console.log("Authenticated");
    if(request.url == "/signin"){
      return NextResponse.redirect(new URL("/", request.url));
    }
    return response;
  } else {
    console.log("unauthenticated");
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/home",
    "/pharmacy",
    "/admin/drugs",
    "/admin/pharmacies",
    "/admin/health-unit",
    // "/signin"
  ],
};
