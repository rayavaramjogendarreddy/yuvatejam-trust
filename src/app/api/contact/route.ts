import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let body: { name?: string; phone?: string; email?: string; subject?: string; message?: string } = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const { name, phone, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    console.log("New Contact Form Submission:", { name, phone, email, subject, message });

    return NextResponse.json(
      { success: true, message: "Thanks for contacting us! We will be in touch with you shortly." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to submit form. Please try again." },
      { status: 500 }
    );
  }
}
