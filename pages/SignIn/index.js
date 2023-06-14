import styles from "./page.module.scss";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function SignIn() {
	const { data: session, status } = useSession();

	return (
		<div className={styles.pageContainer}>
			<div className={styles.leftBoard}>
				<h1>Board.</h1>
				<p>{session?.user?.email}</p>
			</div>

			<div className={styles.rightBoard}>
				<div className={styles.signInBox}>
					<h1>Sign In</h1>
					<p>Sign in to your account</p>
					<div className={styles.authButtons}>
						<button onClick={() => signIn()}>
							{" "}
							<FcGoogle className={styles.buttonIcon} />
							Sign in with Google
						</button>
						<button onClick={() => signIn()}>
							<AiFillApple className={styles.buttonIcon} />
							Sign in with Apple
						</button>
					</div>
					<div className={styles.inputBox}>
						<form action="">
							<label htmlFor="email">Email address</label>
							<input type="text" name="email" id="email" />
							<label htmlFor="passw">Password</label>
							<input type="password" name="passw" id="passw" />
							<a>Forgot Password?</a>
							<button type="submit">Sign In</button>
						</form>
					</div>

					<p className={styles.registerHere}>
						Don’t have an account? <a>Register here</a>
					</p>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session) {
		return {
			redirect: {
				destination: "/Dashboard",
			},
		};
	}
	return {
		props: { session },
	};
};