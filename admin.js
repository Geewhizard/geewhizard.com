const SUPABASE_URL = "https://mgouzykkbpxjtgdvghoc.supabase.co";
const SUPABASE_KEY = "sb_publishable_NE4Ah4WBvguxwcD85QSSGg_BxmdF0MP";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    message.textContent = "Logging in...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        message.textContent = error.message;
        console.error(error);
        return;
    }

    message.textContent = "Logged in!";

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("postBox").style.display = "block";
}

async function makePost() {
    const content = document.getElementById("postContent").value;
    const message = document.getElementById("message");

    if (!content.trim()) {
        message.textContent = "Write something first!";
        return;
    }

    const { data: { user }, error: userError } =
        await supabaseClient.auth.getUser();

    if (userError || !user) {
        message.textContent = "You are not logged in.";
        return;
    }

    const { error } = await supabaseClient
        .from("posts")
        .insert({
            content: content
        });

    if (error) {
        message.textContent = error.message;
        console.error(error);
        return;
    }

    document.getElementById("postContent").value = "";
    message.textContent = "Post published! 🎉";
}
