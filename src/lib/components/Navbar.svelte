<script lang="ts">
    import SignedIn from '$lib/components/SignedIn.svelte';
    import SignedOut from '$lib/components/SignedOut.svelte';
    import { goto } from '$app/navigation';

</script>

<nav>
    <SignedIn let:user let:signOut>
        <h2>Signed In</h2>
        <p>Hello {user.email}</p>
        <button on:click={signOut}>Sign Out</button>
    </SignedIn>
    
    <SignedOut let:auth>
        <h2>Signed Out</h2>
        <button on:click={() => goto("/login")}>Log In</button>
        <button on:click={() => goto('/register')}>Register</button>

    </SignedOut>

    <p>
        <button on:click={() => goto("/")}>Home</button>
    </p>
</nav>