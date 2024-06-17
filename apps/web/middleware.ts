import { NextResponse as NextApiResponse} from 'next/server';
import type { NextRequest ,NextResponse} from 'next/server';
import { auth } from "@/auth"

export const middleware = async (req: NextRequest) => {
    const user = await auth();
    if (req.nextUrl?.pathname ==='/login' && user) {
        return NextApiResponse.redirect(new URL(req.nextUrl.origin));
    }
    
    // If credentials provider is not support session.strategy = "database" 
    // signup(credentials provider) is not allowed.
    // if( req.url === '/signup' && user) {
    //     res.writeHead(302, { Location: '/' });
    //     res.end();
    //     return;
    // }

    // do something with the request if user is authenticated
    // ...
}