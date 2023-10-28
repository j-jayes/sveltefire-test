<!-- src/components/Answer.svelte -->
<script lang="ts">
    import { updateDoc, doc } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";

    export let answerData;
    export let user = null;

    const firestore = getFirebaseContext().firestore;

    async function upvote(answerId) {
        if (!user) return;

        const answerRef = doc(firestore, "answers", answerId);
        await updateDoc(answerRef, {
            votes: answerData.votes + 1
        });
    }
</script>

<p>{answerData.body}</p>
<p>Votes: {answerData.votes}</p>
{#if user}
    <button on:click={() => upvote(answerData.answerId)}>Upvote Answer</button>
{/if}
