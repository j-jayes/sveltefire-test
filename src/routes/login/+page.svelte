<script>
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

    let email = "";
    let password = "";
    let feedbackMessage = ""; // New variable for feedback message
    const auth = getAuth();

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                feedbackMessage = "Login successful"; // Update feedback message on success
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                feedbackMessage = `Error: ${errorMessage}`; // Update feedback message on error
            });
    };
</script>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="text-center mb-4">Log In</h1>
            {#if feedbackMessage}
                <!-- Conditionally render feedback message -->
                <div
                    class="alert alert-{feedbackMessage.startsWith('Error')
                        ? 'danger'
                        : 'success'}"
                >
                    {feedbackMessage}
                </div>
            {/if}
            <form on:submit|preventDefault={signIn}>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        class="form-control"
                        required
                    />
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        bind:value={password}
                        class="form-control"
                        required
                    />
                </div>
                <button type="submit" class="btn btn-primary btn-block"
                    >Log In</button
                >
            </form>
        </div>
    </div>
</div>
