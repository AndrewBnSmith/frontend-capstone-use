import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from 'src/app/Models/goal';
import { GoalsService } from 'src/services/goals.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
  styleUrls: ['./create-goal.component.css']
})
export class CreateGoalComponent implements OnInit {
  public defaultFrom: string;
	public defaultTo: string;
	public deltas: string[];


  goal: Goal = new Goal();
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  tickInterval = 1;

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }


  fromDate!: Date;
  pipe = new DatePipe('en-US');
  newDate!: any;

  goalchart =[
    {name: "goalTotal", value: this.goal.goalTotal},
    {name: "contribute", value: this.goal.contribute}
  ]

  constructor(private goalService : GoalsService , private router : Router) {
    this.defaultFrom = "2022-10-06 00:00:00 AM";
		this.defaultTo = "2023-10-06 00:00:00 AM";
		this.deltas = [];

		this.parseDates( this.defaultFrom, this.defaultTo );
   }

  ngOnInit(): void {
  }

  saveGoal(){
    this.goalService.createGoal(this.goal).subscribe(data => {
      console.log(data);
      this.goToGoalList();
    },
    error => console.log(error));
  }

  goToGoalList(){
    this.router.navigate(['/home/goals']);
  }

  onSubmit(){
    console.log(this.goal);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Successfully added',
      showConfirmButton: false,
      timer: 1500
    })
    this.saveGoal();

  }

  changeFormat(fromDate: Date) {
    let ChangedFormat = this.pipe.transform(this.fromDate, 'YYYY/MM/dd');
    this.newDate = ChangedFormat;
  }

  onClick() {
    this.changeFormat(this.fromDate);
    console.log(this.newDate);
  }

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

  public parseDates( fromValue: string, toValue: string ) : void {

		var fromMs = Date.parse( fromValue );
		var toMs = Date.parse( toValue );

		// Ensure that we have a valid date-range to work with.
		if ( isNaN( fromMs ) || isNaN( toMs ) || ( fromMs > toMs ) ) {

			console.group( "Invalid date range - no calculations to perform." );
			console.log( "From:", fromMs );
			console.log( "To:", toMs );
			console.groupEnd();
			return;

		}

		var deltaSeconds = ( ( toMs - fromMs ) / 1000 );

		this.deltas = [
	
			this.format( this.calculateDaysHoursMinutesSeconds( deltaSeconds ) ),
			
		];

		// Strip out any deltas that start with "0". These won't add any additional
		// insight above and beyond the previous delta calculations.
		// --
		// NOTE: Always using the first value, even if "0 Seconds".
		this.deltas = this.deltas.filter(
			( value, index ) => {

				return( ! index || ! value.startsWith( "0" ) );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I calculate the delta breakdown using Day as the largest unit.
	private calculateDaysHoursMinutesSeconds( delta: number ) : number[] {

		var days = Math.floor( delta / 60 / 60 / 24 );
		var remainder = ( delta - ( days * 60 * 60 * 24 ) );

		return( [ days, ...this.calculateHoursMinutesSeconds( remainder ) ] );

	}


	// I calculate the delta breakdown using Hour as the largest unit.
	private calculateHoursMinutesSeconds( delta: number ) : number[] {

		var hours = Math.floor( delta / 60 / 60 );
		var remainder = ( delta - ( hours * 60 * 60 ) );

		return( [ hours, ...this.calculateMinutesSeconds( remainder ) ] );

	}


	// I calculate the delta breakdown using Minute as the largest unit.
	private calculateMinutesSeconds( delta: number ) : number[] {

		var minutes = Math.floor( delta / 60 );
		var remainder = ( delta - ( minutes * 60 ) );

		return( [ minutes, ...this.calculateSeconds( remainder ) ] );

	}


	// I calculate the delta breakdown using Second as the largest unit.
	private calculateSeconds( delta: number ) : number[] {

		return( [ delta ] );

	}


	// I calculate the delta breakdown using Week as the largest unit.
	private calculateWeeksDaysHoursMinutesSeconds( delta: number ) : number[] {

		var weeks = Math.floor( delta / 60 / 60 / 24 / 7 );
		var remainder = ( delta - ( weeks * 60 * 60 * 24 * 7 ) );

		return( [ weeks, ...this.calculateDaysHoursMinutesSeconds( remainder ) ] );

	}


	// I format the set of calculated delta-values as a human readable string.
	private format( values: number[] ) : string {

		var units: string[] = [ "Weeks", "Days", "Hours", "Minutes", "Seconds" ];
		var parts: string[] = [];

		// Since the values are calculated largest to smallest, let's iterate over them
		// backwards so that we know which values line up with which units.
		for ( var value of values.slice().reverse() ) {

			parts.unshift( value.toLocaleString() + " " + units.pop() );

		}

		return( parts.join( ", " ) );

	}
}
