import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let body: { name?: string; phone?: string; email?: string; interest?: string; message?: string } = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const { name, phone, email, interest, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    console.log("New Volunteer Sign-Up Submission:", { name, phone, email, interest, message });

    return NextResponse.json(
      { success: true, message: "Thank you for volunteering with Yuvatejam Trust! Our team will contact you soon." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to submit volunteer application." },
      { status: 500 }
    );
  }
}
