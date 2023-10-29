<script lang="ts">
  import { getFirebaseContext } from "$lib/stores/sdk.js";
  import PopularQuestions from "$lib/components/PopularQuestions.svelte";

  const ctx = getFirebaseContext();
</script>

<div class="container-md">
  <h2 class="text-center my-5">Welcome to the SCB Users Group</h2>
  <p class="lead">
    This site is for users of the SCB app to ask questions, share knowledge, and
    help each other out. Whether you're a new user or an experienced one, we
    welcome you to join our community and contribute to the discussion.
  </p>
</div>
<div class="container-md d-flex justify-content-center">
  <div class="col-md-8">
    <a href="/add-question" class="btn btn-primary btn-lg">Add Question</a>
    <br />
    <br />
    <PopularQuestions />
  </div>
</div>
