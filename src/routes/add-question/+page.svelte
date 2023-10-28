<script lang="ts">
    import { Timestamp, addDoc, collection } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import SignedOut from "$lib/components/SignedOut.svelte";
    import SignedIn from "$lib/components/SignedIn.svelte";

    const firestore = getFirebaseContext().firestore!;

    let title = "";
    let body = "";
    let selectedTag = "";

    const tags = [
        "Svelte",
        "Firebase",
        "JavaScript",
        "CSS",
        "HTML",
        "Web Development",
        "React",
        "Vue.js",
    ];

    async function addQuestion(uid: string) {
        try {
            const questions = collection(firestore, "questions");
            const createdAt = Date.now();
            const questionData = {
                title,
                body,
                tags: [selectedTag],
                votes: 0,
                createdAt,
                createdBy: uid,
            };

            await addDoc(questions, questionData);

            // Optionally reset the form fields after submission
            title = "";
            body = "";
            selectedTag = "";
        } catch (error) {
            console.error("Error adding question:", error);
            // Optionally display an error message to the user
        }
    }
</script>

<SignedOut let:auth>
    <h2>Signed Out</h2>
    <p>Log in or register to add a question</p>
</SignedOut>

<h1>Add Question</h1>

<SignedIn let:user>
    <form on:submit|preventDefault={addQuestion(user.uid)}>
        <input type="text" bind:value={title} placeholder="Title" required />
        <textarea bind:value={body} placeholder="Body" required />
        <select bind:value={selectedTag} required>
            <option value="" disabled selected>Select a tag</option>
            {#each tags as tag}
                <option value={tag}>{tag}</option>
            {/each}
        </select>
        <button type="submit">Submit Question</button>
    </form>
</SignedIn>

<style>
    /* Optionally add some styling for your form */
    form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
        margin: auto;
    }

    input,
    textarea,
    select {
        margin-bottom: 1em;
        padding: 0.5em;
        font-size: 1em;
    }
</style>
