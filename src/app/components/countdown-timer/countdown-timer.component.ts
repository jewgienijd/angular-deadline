import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, map, Observable, switchMap, takeWhile } from 'rxjs';
import { DeadlineService } from 'src/app/services/deadline.service';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownTimerComponent implements OnInit {
  countdown$!: Observable<number>;

  constructor(
    private deadlineService: DeadlineService
  ) {}

  ngOnInit(): void {
    this.countdown$ = this.deadlineService.getSecondsLeft().pipe(      
      switchMap((initialSecondsLeft: number) =>
        interval(1000).pipe(
          map(tickCount => initialSecondsLeft - tickCount),
          takeWhile(timeLeft => timeLeft >= 0)
        )
      )
    );
  }

}
