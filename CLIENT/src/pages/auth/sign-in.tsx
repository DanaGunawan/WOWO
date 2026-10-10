import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import Logo from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "react-router-dom";
import { authRoutes } from "@/routes/routes";


const formSchema = z.object({
    email: z
      .string()
      .trim()
      .email("invalid email address")
      .min(1, "email is required"),
    password: z
      .string()
      .trim()
      .min(6, "password must be at least 6 characters")
      .min(1, "password is required"),
    avatar: z.string().optional(),
  });

  
const SignIn = () => {
  const { login, isLoggingIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isLoggingIn) return;
    login(values);
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted p-6">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="flex flex-col items-center justify-center">
            <Logo />
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="rudygunawan@gmail.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="*********"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button disabled={isLoggingIn} type="submit" className="w-full">
                  {isLoggingIn && <Spinner />} Sign In
                </Button>

                <div className="text-center text-sm">
                  doesn't have an account?
                  <Link to={authRoutes.SIGN_UP} className="underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
