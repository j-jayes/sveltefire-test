<script lang="ts">
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import SignedOut from "$lib/components/SignedOut.svelte";
    import SignedIn from "$lib/components/SignedIn.svelte";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { doc, setDoc, Timestamp} from "firebase/firestore";

    let username = "";
    let email = "";
    let password = "";

    const auth = getAuth();
    const firestore = getFirebaseContext().firestore;

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            const userDocRef = doc(firestore, "users", user.uid);
            const userData = {
                username,
                email,
                createdAt: Date.now(),
            };
            await setDoc(userDocRef, userData);
            alert("User registered successfully");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Error registering user:", error.message);
        }
    };
</script>

<SignedOut let:auth>
    <h1>Sign in or Register</h1>

    <form on:submit|preventDefault={register}>
        <label for="username">Username</label>
        <input type="text" id="username" bind:value={username} required />

        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} required />

        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password} required />

        <button type="submit">Register</button>
    </form>
</SignedOut>

<SignedIn>
    <h2>You are already signed in</h2>
</SignedIn>
