import { redirect } from "next/navigation";

export default function Home(): JSX.Element {
	redirect("/root/auth/login");
	// return <div>v.0.7.1</div>;
}
