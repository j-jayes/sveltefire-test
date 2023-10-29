<script lang="ts">
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import SignedOut from "$lib/components/SignedOut.svelte";
    import SignedIn from "$lib/components/SignedIn.svelte";
    import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    import { doc, setDoc, Timestamp } from "firebase/firestore";

    let username = "";
    let email = "";
    let password = "";
    let feedbackMessage = "";

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
            feedbackMessage = "Registration Successful";
        } catch (error) {
            console.error("Error registering user:", error);
            feedbackMessage = `Error: ${error.message}`; // Update feedback message on error
        }
    };
</script>

<container>
    <SignedOut let:auth>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <h1 class="text-center mb-4">Register</h1>
                    {#if feedbackMessage}
                        <!-- Conditionally render feedback message -->
                        <div
                            class="alert alert-{feedbackMessage.startsWith(
                                'Error'
                            )
                                ? 'danger'
                                : 'success'}"
                        >
                            {feedbackMessage}
                        </div>
                    {/if}
                    <form on:submit|preventDefault={register}>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                bind:value={username}
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                bind:value={email}
                                class="form-control"
                                required
                            />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                bind:value={password}
                                class="form-control"
                                required
                            />
                        </div>
                        <button type="submit" class="btn btn-primary btn-block"
                            >Register</button
                        >
                    </form>
                </div>
            </div>
        </div>
    </SignedOut>

    <SignedIn>
        <h2 class="text-center">You have signed in</h2>
    </SignedIn>
</container>
