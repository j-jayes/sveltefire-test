<!-- src/components/Question.svelte -->
<script lang="ts">
    import { updateDoc, doc } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";

    export let questionData;
    export let user = null;

    const firestore = getFirebaseContext().firestore;

    async function upvote(questionId) {
        if (!user) return;

        const questionRef = doc(firestore, "questions", questionId);
        await updateDoc(questionRef, {
            votes: questionData.votes + 1
        });
    }
</script>

<h1>{questionData.title}</h1>
<p>{questionData.body}</p>
<p>Tags: {questionData.tags.join(", ")}</p>
<p>Votes: {questionData.votes}</p>
{#if user}
    <button on:click={() => upvote(questionData.questionId)}>Upvote Question</button>
{/if}
