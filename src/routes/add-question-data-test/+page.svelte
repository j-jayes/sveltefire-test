<script lang="ts">
    import { Timestamp, addDoc, collection } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";

    const firestore = getFirebaseContext().firestore!;

    async function addQuestion({ title, body, tags, votes, createdBy }) {
        const questions = collection(firestore, "questions");
        const createdAt = Date.now();
        const questionData = {
            title,
            body,
            tags,
            votes,
            createdAt,
            createdBy,
        };
        await addDoc(questions, questionData);
    }

    const sampleQuestions = [
        {
            title: "How do I create a Svelte component?",
            body: "I am new to Svelte and I am wondering how to create a component. Can someone provide a step-by-step guide?",
            tags: ["Svelte", "component", "beginner"],
            votes: 10,
            createdBy: "user1",
        },
        {
            title: "How can I manage state in Svelte?",
            body: "I have experience with React, but I am new to Svelte. How can I manage state in a Svelte application?",
            tags: ["Svelte", "state", "React"],
            votes: 8,
            createdBy: "user2",
        },
        // ... more questions
    ];
    async function addSampleQuestions() {
        for (const question of sampleQuestions) {
            await addQuestion(question);
        }
    }
</script>

<div>
    <button on:click={addSampleQuestions}>Add Sample Questions</button>
</div>
