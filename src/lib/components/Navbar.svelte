<script lang="ts">
    import SignedIn from "$lib/components/SignedIn.svelte";
    import SignedOut from "$lib/components/SignedOut.svelte";
    import { goto } from "$app/navigation";

    let isNavOpen = false;

    function toggleNav() {
        isNavOpen = !isNavOpen;
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">SCB Users Group</a>
    <button
        class="navbar-toggler"
        type="button"
        on:click={toggleNav}
        aria-label="Toggle navigation"
    >
        <span class="navbar-toggler-icon" />
    </button>
    <div
        class={isNavOpen
            ? "navbar-collapse collapse show"
            : "navbar-collapse collapse"}
        id="navbarNav"
    >
        <ul class="navbar-nav ml-auto">
            <SignedIn let:user let:signOut>
                <li class="nav-item">
                    <span class="navbar-text">Hello {user.email}</span>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" on:click={signOut}>Sign Out</a>
                </li>
            </SignedIn>
            <SignedOut let:auth>
                <li class="nav-item">
                    <a class="nav-link" href="/login">Log In</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>
            </SignedOut>
            <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
            </li>
        </ul>
    </div>
</nav>

<style>
    .navbar-nav .nav-link:hover {
        color: var(--bs-primary) !important;
    }
    .navbar-nav .active .nav-link {
        color: var(--bs-primary) !important;
    }
    @media (max-width: 991px) {
        #navbarNav {
            margin-left: 1rem;
        }
        .navbar-toggler {
            margin-right: 1rem;
        }
    }
</style>
