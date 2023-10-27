<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

    let email = '';
    let password = '';
    const auth = getAuth();

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

</script>

<form on:submit|preventDefault={signIn}>
    <label for="email">Email:</label>
    <input id="email" type="email" bind:value={email} required>

    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required>

    <button type="submit">Log In</button>
</form>