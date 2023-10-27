<script>
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { doc, setDoc } from "firebase/firestore"; 
    
    let email = '';
    let password = '';
    let username = '';

    const auth = getAuth();

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // Add user to Firestore
                return setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email
                });
            })
            .then(() => {
                // User added to Firestore
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
</script>

<form on:submit|preventDefault={register}>
    <label for="username">Username:</label>
    <input id="username" type="text" bind:value={username} required>

    <label for="email">Email:</label>
    <input id="email" type="email" bind:value={email} required>

    <label for="password">Password:</label>
    <input id="password" type="password" bind:value={password} required>

    <button type="submit">Register</button>
</form>