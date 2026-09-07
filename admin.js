const SUPABASE_URL = "https://mgouzykkbpxjtgdvghoc.supabase.co";
const SUPABASE_KEY = "sb_publishable_NE4Ah4WBvguxwcD85QSSGg_BxmdF0MP";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        document.getElementById("message").textContent = error.message;
        return;
    }

    document.getElementById("message").textContent = "Logged in!";
}
