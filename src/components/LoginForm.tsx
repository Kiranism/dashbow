"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import Link from "next/link";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .max(17, { message: "Username must be less than 17 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleRegisterUser = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", values);
      console.log("Signup success", response.data);
      toast.success("Login Successful");
      router.push("/dashboard");
    } catch (error) {
      console.log("res err=>", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegisterUser)}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign into an account</CardTitle>
            <CardDescription>
              Enter your username and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="john" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        type="password"
                        placeholder="****"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="w-full">
              <Button disabled={loading} className="w-full">
                Login
              </Button>
            </div>

            <div className="text-sm my-2">
              Dont have an account?
              <Link className="text-indigo-500 mx-1" href={"/signup"}>
                Signup
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
