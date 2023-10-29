<!-- PopularQuestions.svelte -->
<script>
    import { getFirebaseContext } from "$lib/stores/sdk.ts";
    import { formatDate } from "$lib/utils.ts";
    import Collection from "$lib/components/Collection.svelte";
    import SignedIn from "$lib/components/SignedIn.svelte";
    import SignedOut from "$lib/components/SignedOut.svelte";
    import { collection, limit, orderBy, query } from "firebase/firestore";

    const firestore = getFirebaseContext().firestore;

    $: makeQueryQuestions = () => {
        const q = query(
            collection(firestore, "questions"),
            orderBy("votes", "desc"),
            limit(25)
        );
        return q;
    };
</script>

<Collection
    ref={makeQueryQuestions()}
    startWith={[]}
    let:data={questions}
    let:count
>
    <!-- <p data-testid="count">There are {count} questions</p> -->
    
    {#each questions as question (question.id)}
        <a
            href={`/question${question.id}`}
            class="card mb-3 text-decoration-none text-dark"
        >
            <div class="card-body">
                <h4 class="card-title">{question.title}</h4>
                <p class="card-text">{question.body.slice(0, 150)}...</p>
            </div>
            <div class="card-footer">
                {#each question.tags as tag}
                    <span class="badge badge-primary mr-2">{tag}</span>
                {/each}
                <span class="float-right">
                    <span class="mr-2">{question.votes} votes</span>
                    <small class="text-muted"
                        >{formatDate(question.createdAt)}</small
                    >
                </span>
            </div>
        </a>
    {/each}
</Collection>
