<!-- routes/+layout.svelte -->
<script lang="ts">
  import "../app.scss";
  import "../app.scss";
  import Navbar from "$lib/components/Navbar.svelte";
  import FirebaseApp from "$lib/components/FirebaseApp.svelte";
  import { db as firestore, auth, storage } from "./firebase.js";
</script>

<FirebaseApp {auth} {firestore} {storage}>
  <Navbar />
  <slot />
</FirebaseApp>
