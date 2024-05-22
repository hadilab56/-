import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ContactUsService } from 'src/app/services/contact-us.service';

@Component({
  selector: 'app-our-univers',
  templateUrl: './our-univers.component.html',
  styleUrls: ['./our-univers.component.css'],
})
export class OurUniversComponent {
  ContactForm: FormGroup;
  submitMessage: string = '';

  @ViewChild('succesSwal')
  public readonly succesSwal!: SwalComponent;

  @ViewChild('failSwal')
  public readonly failSwal!: SwalComponent;

  constructor(private fb: FormBuilder, private service: ContactUsService) {
    this.ContactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      msg: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.ContactForm.valid) {
      const formData = this.ContactForm.value;

      this.service.SendMessage(formData).subscribe({
        next: async (res) => {
          this.submitMessage = res.message;

          await this.fireSuccess();

          this.ContactForm.reset();
        },
        error: async (err) => {
          this.submitMessage = err.message;

          await this.fireFail();
          this.ContactForm.reset();
        },
      });
    }
  }

  private async fireSuccess() {
    await this.succesSwal.fire();
  }

  private async fireFail() {
    await this.failSwal.fire();
  }
}
