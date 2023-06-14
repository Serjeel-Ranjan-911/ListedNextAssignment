import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Home() {
	const { data: session, status } = useSession();

	return (
		<div>
			<h1>This is main page</h1>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/SignIn",
			},
		};
	}
	return {
		props: { session },
	};
};
