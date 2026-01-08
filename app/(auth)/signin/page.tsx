import SigninGoogle from "./SigninGoogle";

export default async function Signin({ searchParams }: { searchParams: Promise<{ redirect_url: string }> }) {
  const redirectUrl = (await searchParams)?.redirect_url;

  return (
    <div className="container flex items-center justify-center h-80">
      <div className="border w-72 rounded p-4">
        <h1>Sign In</h1>
        <SigninGoogle redirectUrl={redirectUrl} />
      </div>
    </div>
  );
}
