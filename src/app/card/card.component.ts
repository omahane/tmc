import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardsService } from '../cards.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card: any;
  cardNameParam: string;

  constructor(
    private cardService: CardsService,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.getCard();
  }

  getCard(): void {
    this.cardNameParam = this.route.snapshot.paramMap.get('cardName');

    this.cardService.getCard(this.cardNameParam).subscribe(r => {
      this.card = r;
      this.titleService.setTitle(this.card[0]);
    });
  }

  isNumber(value: string | number): boolean {
    return !isNaN(Number(value.toString()));
  }

  counter(n: string): any[] {

    if (n && this.isNumber(n)) {
      return Array.from(Array(Number(n)).keys());
    }

    return Array(0);
  }
}
