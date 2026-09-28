import SignIn from "@/pages/auth/sign-in"
import SignUp from "@/pages/auth/sign-up"
import Chat from "@/pages/chat";
import SingleChat from "@/pages/chat/chatId";


export const authRoutes = {
    SIGN_IN : "/",
    SIGN_UP : "/sign-up"
}

export const protectedRoutes = {
    CHAT : "/chat",
    SINGLE_CHAT : "/chat/:chatId"
}

export const authRoutesPaths = [
    {
        path : authRoutes.SIGN_IN,
        element : <SignIn />
    },
    {
        path : authRoutes.SIGN_UP,
        element : <SignUp/>
    }
];

export const protectedRoutesPaths = [
    {
        path: protectedRoutes.CHAT,
        element : <Chat/>
    },
    {
        path : protectedRoutes.SINGLE_CHAT,
        element : <SingleChat />
    }
];



export const isAuthRoute = (authPath : string) => {
    return Object.values(authRoutes).includes(authPath)
}