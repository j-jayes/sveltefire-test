<script lang="ts">
    import { collection, addDoc } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";

    const firestore = getFirebaseContext().firestore!;

    export let questionId: string; // Prop to accept questionId
    export let userId: string; // Prop to accept userId

    let body = "";
    let feedbackMessage = "";

    async function addAnswer() {
        feedbackMessage = "Answer submitted"; // Update feedback message on success
        const answers = collection(firestore, "answers");
        const createdAt = Date.now();
        const answerData = {
            body,
            votes: 0,
            createdAt,
            createdBy: userId, // Use userId prop
            questionId, // Use questionId prop
        };

        await addDoc(answers, answerData);

        // Optionally reset the text area
        body = "";
    }
</script>

<div class="container mt-4">
    <div class="row">
        <div class="col-md-12">
            {#if feedbackMessage}
                <!-- Conditionally render feedback message -->
                <div class="alert alert-success">
                    {feedbackMessage}
                </div>
            {/if}
            <form>
                <div class="form-group">
                    <textarea
                        bind:value={body}
                        placeholder="Your answer..."
                        class="form-control"
                        rows="5"
                    />
                </div>
                <button on:click={addAnswer} class="btn btn-secondary"
                    >Submit Answer</button
                >
            </form>
        </div>
    </div>
</div>
