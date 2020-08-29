import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Munit } from '../munit.model';
import { MsgService } from './../../../components/message/msg.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { HeaderService } from '../../header/header.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {

  form: FormGroup;

  fields: Array<string> = ['name', 'munit', 'price', 'dtValidade', 'dtManufac'];
  errors: Array<string> = [];
  typeMunit: string = '';

  maxFrac: number = 3;
  minFrac: number = 3;
  buttonsVisible: boolean;

  optionUM: Munit[] = [
    { value: 1, viewValue: 'Litros', type: 'lt' },
    { value: 2, viewValue: 'Quilograma', type: 'kg' },
    { value: 3, viewValue: 'Unidade', type: 'un' }
  ];

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private router: Router,
    private headerService: HeaderService,
    private msgService: MsgService,
    private fb: FormBuilder,

  ) {
    const id = this.route.snapshot.params.id;

    if (!id && this.product.id) {
      this.clearView()
    }
    this.buttonsVisible = false;
  }

  clearView() {
    this.headerService.headerData = {
      title: 'Novo Produto',
      routeUrl: 'list-products',
      icon: ''
    }

    this.service.productData = {
      title: 'Novo Produto',
      product: { price: 0, qt: 0, perishable: false },
      type: 'success',
      label: 'Salvar',
    }

  }

  ngOnInit(): void {
    this.createForms();
    this.buttonsVisible = true;
  }

  get title(): string {
    return this.service.productData.title;
  }

  get label(): string {
    return this.service.productData.label;
  }

  get type(): string {
    return this.service.productData.type;
  }

  get product(): Product {
    return this.service.productData.product;
  }

  get action(): any {
    return this.service.productData.action;
  }

  isFormDisabled(): boolean {
    return this.type == 'danger';
  }


  createForms(): void {
    this.form = this.fb.group({
      name: [{ value: '', disabled: this.isFormDisabled() }, Validators.compose([Validators.required, Validators.maxLength(50)])],
      munit: [{ value: '', disabled: this.isFormDisabled() }, Validators.compose([Validators.required])],
      price: [{ value: '', disabled: this.isFormDisabled() }, Validators.compose([Validators.required])],
      dtValidade: [{ value: '', disabled: this.isFormDisabled() }, Validators.compose([Validators.required])],
      dtManufac: [{ value: '', disabled: this.isFormDisabled() }, Validators.compose([Validators.required])],
      qt: [{ value: '', disabled: this.isFormDisabled() }],
      perishable: [{ value: '', disabled: this.isFormDisabled() }],
    });

    this.updateRequiredDtValid();
  }

  execValidateRulesFields(): void {
    this.fields.forEach(field => {
      this.validateField(this.product[field], field);
    });

    this.validateFieldDate();
  }

  execAction(): void {
    this.errors = [];
    this.execValidateRulesFields();

    if (!this.errors.length) {
      this.action(this.product);
    } else {
      this.errors.forEach(msg => {
        this.msgService.showError(msg);
      })
    }
  }

  toProduct(): void {
    this.router.navigate(['list-products']);
  }

  cancel(): void {
    this.toProduct();
  }

  get perishable(): boolean {
    return this.product['perishable'];
  }

  getMessageField(nmField: string): string {
    return {
      'name': 'O nome é obrigatório',
      'munit': 'A unidade medida é obrigatória',
      'price': 'O preço é obrigatório',
      'dtManufac': 'A data de fabricação é obrigatória',
      'dtValidade': this.perishable ? 'A data de validade é obrigatória' : '',
      'dtManufac>dtValidade': 'A data de fabricação não pode ser maior que a data de validade',
      'product>today': 'O produto está vencido!',
    }[nmField];
  }

  getValue(key): object {
    return this.product[key];
  }

  isDtValidadeNull(): boolean {
    return this.product.dtValidade == null || !this.product.dtValidade.valueOf();
  }

  isDtManufacNull(): boolean {
    return this.product.dtManufac == null || !this.product.dtManufac.valueOf();
  }

  validateFieldDate(): void {
    const m = moment;
    if (!this.isDtValidadeNull() && m(this.product.dtValidade).isBefore(m())) {
      this.errors.push(this.getMessageField('product>today'));
    }
    if (this.perishable
      && !this.isDtValidadeNull()
      && !this.isDtManufacNull()
      && m(this.product.dtManufac).isAfter(m(this.product.dtValidade))) {
      this.errors.push(this.getMessageField('dtManufac>dtValidade'));
    }
  }

  onChangeMunit(): void {
    if (!_.isEmpty(this.product.munit)) {
      this.typeMunit = this.product.munit.type;
      this.maxFrac = this.product.munit.type == 'un' ? 0 : 3;
      this.minFrac = this.product.munit.type == 'un' ? 0 : 3;
    }
  }

  validateField(value: any, nmField: string): void {
    if (value == null || !value.valueOf() || (nmField == 'munit' && _.isEmpty(value.valueOf()))) {
      const msg = this.getMessageField(nmField);
      if (msg) {
        this.errors.push(msg);
      }
    }

  }

  onChangePerishable(): void {
    this.updateRequiredDtValid();
  }

  updateRequiredDtValid(): void {
    const fieldDtValidade = this.form.get('dtValidade');

    if (this.perishable) {
      fieldDtValidade.setValidators([Validators.required]);
    } else {
      fieldDtValidade.clearValidators();
    }
    this.form.get('dtValidade').updateValueAndValidity();
  }

}
