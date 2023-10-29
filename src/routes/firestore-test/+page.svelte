<script lang="ts">
  import Doc from "$lib/components/Doc.svelte";
  import SignedOut from "$lib/components/SignedOut.svelte";
  import {
    Timestamp,
    addDoc,
    collection,
    orderBy,
    query,
  } from "firebase/firestore";
  import Collection from "$lib/components/Collection.svelte";
  import SignedIn from "$lib/components/SignedIn.svelte";
  import { getFirebaseContext } from "$lib/stores/sdk.ts";
  import { formatDate } from "$lib/utils.ts";

  const firestore = getFirebaseContext().firestore!;

  async function addPost(uid: string) {
    const posts = collection(firestore, `users/${uid}/posts`);
    await addDoc(posts, {
      content:
        "firestore item " + (Math.random() + 1).toString(36).substring(7),
      created: Date.now(),
    });
  }

  $: makeQuery = (uid: string) => {
    const q = query(
      collection(firestore, `users/${uid}/posts`),
      orderBy("created")
    );
    return q;
  };

  $: makeQueryQuestions = () => {
    const q = query(collection(firestore, "questions"), orderBy("votes"));
    return q;
  };
</script>

<h1>Firestore Test</h1>

<h2>User Owned Posts</h2>

<SignedOut let:auth>
  <h2>Signed Out</h2>
  <p>Log in or register to see your posts</p>
</SignedOut>

<SignedIn let:user>
  <h2>Collection</h2>
  <Collection
    ref={makeQuery(user.uid)}
    startWith={[]}
    let:data={posts}
    let:count
  >
    <p data-testid="count">You've made {count} posts</p>

    <ul>
      {#each posts as post (post.id)}
        <li>{post?.content} ... {post.id} ... {formatDate(post.created)}</li>
      {/each}
    </ul>

    <button on:click={() => addPost(user.uid)}>Add Post</button>
  </Collection>

  <h2>Collection</h2>
  <Collection
    ref={makeQueryQuestions()}
    startWith={[]}
    let:data={questions}
    let:count
  >
    <p data-testid="count">There are {count} questions</p>

    <ul>
      {#each questions as question (question.id)}
        <li>{question?.body}  {question.id} ... {formatDate(question.createdAt)}</li>
      {/each}
    </ul>

  </Collection>
</SignedIn>
