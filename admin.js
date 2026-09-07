const SUPABASE_URL = "https://mgouzykkbpxjtgdvghoc.supabase.co";
const SUPABASE_KEY = "sb_publishable_NE4Ah4WBvguxwcD85QSSGg_BxmdF0MP";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// Log in
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        message.textContent = error.message;
        return;
    }

    message.textContent = "Logged in!";

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("postBox").style.display = "block";
}

// Make a post
async function makePost() {
    const content = document.getElementById("postContent").value;
    const message = document.getElementById("message");

    if (!content.trim()) {
        message.textContent = "Write something first!";
        return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        message.textContent = "You are not logged in.";
        return;
    }

    const { error } = await supabase
        .from("posts")
        .insert({
            content: content
        });

    if (error) {
        message.textContent = error.message;
        return;
    }

    document.getElementById("postContent").value = "";
    message.textContent = "Post published! 🎉";
}
