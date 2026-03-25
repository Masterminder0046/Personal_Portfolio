from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def contact(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            email = data.get('email')
            message = data.get('message')

            # Validation
            if not name or not email or not message:
                return JsonResponse({'status': 'error', 'message': 'All fields are required.'}, status=400)

            # Construct Email
            subject = f"New Portfolio Contact from {name}"
            email_body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
            
            send_mail(
                subject,
                email_body,
                settings.EMAIL_HOST_USER, # From email
                [settings.EMAIL_HOST_USER], # To email (your inbox)
                fail_silently=False,
            )

            return JsonResponse({'status': 'success', 'message': 'Your message has been sent successfully!'})

        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=400)
