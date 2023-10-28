<script lang="ts">
    import { onMount } from "svelte";
    import { collection, doc, getDoc } from "firebase/firestore";
    import { getFirebaseContext } from "$lib/stores/sdk.js";
    import { page } from "$app/stores";  // Import the page store to access route params
  
    const firestore = getFirebaseContext().firestore!;
    
    let questionId: string;
    let questionData;
  
    $: questionId = $page.params.questionId;  // Get the questionId from the route params
  
    onMount(async () => {
      const questionRef = doc(firestore, "questions", questionId);
      const questionSnap = await getDoc(questionRef);
  
      if (questionSnap.exists()) {
        questionData = questionSnap.data();
      } else {
        console.error("No such question!");
      }
    });
  
    // Function to fetch user name based on uid
    async function getUserName(uid: string) {
      const userRef = doc(firestore, "users", uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        return userSnap.data().name;
      } else {
        console.error("No such user!");
        return "Unknown User";
      }
    }
  </script>
  
  {#if questionData}
    <h1>{questionData.title}</h1>
    <p>{questionData.body}</p>
    <p>Tags: {questionData.tags.join(', ')}</p>
    <p>Votes: {questionData.votes}</p>
    <p>Created At: {new Date(questionData.createdAt.seconds * 1000).toLocaleString()}</p>
    <p>Created By: {#await getUserName(questionData.createdBy)}...{/await}</p>
  {:else}
    <p>Loading...</p>
  {/if}
  