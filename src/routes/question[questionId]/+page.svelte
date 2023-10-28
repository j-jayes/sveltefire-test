<script lang="ts">
    import { onMount } from "svelte";
    import {
        doc,
        getDoc,
        collection,
        getDocs,
        query,
        where,
    } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import { page } from "$app/stores";
    import AddAnswer from "$lib/components/AddAnswer.svelte";
    import SignedIn from "$lib/components/SignedIn.svelte";
    import SignedOut from "$lib/components/SignedOut.svelte";
    import {
        formatDate,
        getUserName,
        fetchQuestionData,
        fetchAnswers,
        fetchUserNames,
        handleUpvote,
    } from "$lib/utils.ts";

    const firestore = getFirebaseContext().firestore;
    let questionId: string;
    let questionData;
    let answers = [];
    let userNames = {};

    $: questionId = $page.params.questionId;

    onMount(async () => {
        questionData = await fetchQuestionData(firestore, questionId);
        answers = await fetchAnswers(firestore, questionId);
        if (answers.length > 0) {
            const userIds = Array.from(
                new Set(answers.map((answer) => answer.createdBy))
            );
            userNames = await fetchUserNames(firestore, userIds);
        }
    });

    async function upvote(userId, itemID, isQuestion) {
        await handleUpvote(firestore, userId, itemID, isQuestion);
    }
    
</script>

<SignedIn let:user>
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-3">
          <div class="sidebar">
            <h3>Sidebar</h3>
          </div>
        </div>
  
        <!-- Main Content -->
        <div class="col-md-9">
          {#if questionData}
            <div class="card mb-4">
              <div class="card-body">
                <h1 class="card-title">{questionData.title}</h1>
                <p class="card-text">{questionData.body}</p>
                <p>Tags: {questionData.tags.join(", ")}</p>
                <p>Votes: {questionData.votes}</p>
                <button on:click={() => upvote(user.uid, questionId, true)} class="btn btn-primary">
                  Upvote Question
                </button>
                <p>Created At: {formatDate(questionData.createdAt)}</p>
                <p>Created By uid: {questionData.createdBy}</p>
                <p>Created By: {userNames[questionData.createdBy]}</p>
              </div>
            </div>
  
            <!-- Answers -->
            <h2>Answers</h2>
            {#each answers as answer}
              <div class="card mb-3">
                <div class="card-body">
                  <p class="card-text">{answer.body}</p>
                  <p>By: {userNames[answer.createdBy]}</p>
                  <p>Created At: {formatDate(answer.createdAt)}</p>
                  <p>Votes: {answer.votes}</p>
                  <button on:click={() => handleUpvote(firestore, user.uid, answer.id, false)} class="btn btn-primary">
                    Upvote Answer
                  </button>
                </div>
              </div>
            {/each}
  
          {:else}
            <p>Loading...</p>
          {/if}
  
          <AddAnswer {questionId} userId={user.uid} />
        </div>
      </div>
    </div>
  </SignedIn>
  
  <SignedOut let:auth>
    <div class="container">
      <p>Log in or register to add an answer</p>
    </div>
  </SignedOut>
  