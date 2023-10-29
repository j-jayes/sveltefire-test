// utils.js
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    increment,
    updateDoc,
    orderBy,
    query,
    where,
    limit
} from "firebase/firestore";

export function formatDate(dateString) {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

export async function getUserName(firestore, uid) {
    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data().username;
    } else {
        console.error("No such user!");
        return "Unknown User";
    }
}


export async function fetchQuestionData(firestore, questionId) {
    const questionRef = doc(firestore, "questions", questionId);
    const questionSnap = await getDoc(questionRef);
    if (questionSnap.exists()) {
        return questionSnap.data();
    } else {
        console.error("No such question!");
        return null;
    }
}

// utils.ts
export async function fetchAnswers(firestore, questionId) {
    const answersCollection = collection(firestore, "answers");
    const answersQuery = query(
        answersCollection,
        where("questionId", "==", questionId),
        orderBy("createdAt")
    );
    const answersSnap = await getDocs(answersQuery);
    return answersSnap.docs.map(doc => ({
        id: doc.id,  // include the id here
        ...doc.data()
    }));
}

// utils.ts
export async function fetchUserNames(firestore, userIds) {
    if (userIds.length > 0) {
        const userSnaps = await Promise.all(
            userIds.map(uid => getUserName(firestore, uid))
        );
        return Object.fromEntries(
            userIds.map((uid, index) => [uid, userSnaps[index]])
        );
    }
    return {};
}


export async function handleUpvote(firestore, userId, questionOrAnswerId, isQuestion) {
    try {

        const itemType = isQuestion ? 'questions' : 'answers';
        const itemRef = doc(firestore, itemType, questionOrAnswerId);
        const upvoteRef = doc(itemRef, 'upvotes', userId);

        const upvoteSnap = await getDoc(upvoteRef);
        if (!upvoteSnap.exists()) {
            // User hasn't upvoted yet, so process the upvote
            await setDoc(upvoteRef, { upvoted: true }, { merge: true });  // Mark this user as having upvoted

            // Increment the votes count on the question or answer
            const itemSnap = await getDoc(itemRef);
            const currentVotes = itemSnap.data().votes || 0;
            await setDoc(itemRef, { votes: currentVotes + 1 }, { merge: true });
        }
    } catch (error) {
        console.error('Error handling upvote:', error);
    }
}




