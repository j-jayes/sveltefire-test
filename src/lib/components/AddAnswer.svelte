<script lang="ts">
    import { collection, addDoc } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";

    const firestore = getFirebaseContext().firestore!;

    export let questionId: string;  // Prop to accept questionId
    export let userId: string;  // Prop to accept userId

    let body = "";

    async function addAnswer() {
        const answers = collection(firestore, "answers");
        const createdAt = Date.now();
        const answerData = {
            body,
            votes: 0,
            createdAt,
            createdBy: userId,  // Use userId prop
            questionId  // Use questionId prop
        };
        
        await addDoc(answers, answerData);
        
        // Optionally reset the text area
        body = "";
    }
</script>

<textarea bind:value={body} placeholder="Your answer..."></textarea>
<button on:click={addAnswer}>Submit Answer</button>
