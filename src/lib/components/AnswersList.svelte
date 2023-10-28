<!-- src/components/AnswersList.svelte -->
<script>
    export let answers;
    export let user = null;
    import Answer from "$lib/components/Answer.svelte";
</script>

<h2>Answers</h2>
{#each answers as answerData}
    <Answer {answerData} {user} />
{/each}
