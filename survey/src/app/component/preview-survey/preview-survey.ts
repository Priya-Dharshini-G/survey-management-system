import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-preview-survey',
  imports: [NgClass, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './preview-survey.html',
  styleUrl: './preview-survey.sass',
})
export class PreviewSurvey {
  /**
   * Variable which is used to store the survey.
   */
  @Input() survey: any;
  /**
   * Variable which is used to emit the preview state.
   */
  @Output() setPreview = new EventEmitter<boolean>();
  /**
   * Component life cycle hook.
   */
  ngOnInit() {
    this.survey.questions.forEach((item: any, index: number) => {
      if (item.type === 'Star' || item.type === 'Number') {
        this.getRange(item.rate, index);
      }
    });
  }
  /**
   * Method which is used to add the rating array.
   */
  getRange(range: any, index: number): any[] {
    this.survey.questions[index].rating = Array.from({ length: range }, (_, i) => ({
      option: i + 1,
      isSelected: false,
    }));
    return this.survey.questions[index].rating;
  }
  /**
   * Method which is used to update the selected number.
   */
  selectedNumber(index: number, position: number) {
    this.survey.questions[index].rating.forEach((item: any) => {
      if (item.isSelected) item.isSelected = false;
    });
    this.survey.questions[index].rating[position].isSelected = true;
  }
  /**
   * Method which is used to update the selected star.
   */
  selectedStar(index: number, position: number) {
    if (!this.survey.questions[index].rating[position].isSelected) {
      this.survey.questions[index].rating.forEach((item: any) => {
        if (item.isSelected) item.isSelected = false;
      });
      for (let i = 0; i <= position; i++) {
        this.survey.questions[index].rating[i].isSelected = true;
      }
    } else {
      this.survey.questions[index].rating[position].isSelected = false;
    }
  }
  /**
   * Method which is used to emit the preview state.
   */
  backToSurvey() {
    this.setPreview.emit(false);
  }
}
