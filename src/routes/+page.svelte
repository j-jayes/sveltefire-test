<script lang="ts">
  import { getFirebaseContext } from "$lib/stores/sdk.js";
  import PopularQuestions from "$lib/components/PopularQuestions.svelte";


  const ctx = getFirebaseContext();

</script>

<h1>Welcome to SvelteFire</h1>

<ul>
  <li><a href="/auth-test">Auth Test</a></li>
  <li><a href="/firestore-test">Firestore Test</a></li>
  <li><a href="/ssr-test">SSR Test</a></li>
  <li><a href="/storage-test">Storage Test</a></li>
  <li><a href="/add-question-data-test">Add Question Data Test</a></li>
  <li><a href="/add-question">Add Question</a></li>
  <li><a href="/popular-questions">Popular Questions</a></li>
</ul>
<ul>
  <li data-testid="auth">Auth Context: {!!ctx.auth}</li>
  <li data-testid="firestore">Firestore Context: {!!ctx.firestore}</li>
  <li data-testid="storage">Storage Context: {!!ctx.storage}</li>
</ul>




<div class="container-md d-flex justify-content-center">
  <div class="col-md-8">
    <PopularQuestions />
  </div>
</div>
