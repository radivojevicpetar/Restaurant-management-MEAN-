import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import { DostavaService } from '../services/dostava.service';
import { Konobar } from '../models/konobar';
import { Rezervacija } from '../models/rezervacija';
import { RezervacijaService } from '../services/rezervacija.service';
import { CanvasJS } from '@canvasjs/angular-charts';
import { Restoran } from '../models/restoran';
import { RestoranService } from '../services/restoran.service';

interface Reservation {
  konobar: string;
  brojLjudi: number;
}

interface KonobarData {
  konobar: string;
  totalGuests: number;
}

@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})


export class StatistikaComponent {
  constructor(private restoranService:RestoranService,private rezervacijaService:RezervacijaService,private datePipe:DatePipe,private router:Router,private konobarService: KonobarService, private dostavaService:DostavaService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('ulogovankonobar')) {
      this.router.navigate(['']);
    }
    this.sviKonobari=[]
    let konobarKorProv=localStorage.getItem('ulogovankonobar');
    if(konobarKorProv!=null){
      this.konobarKor=konobarKorProv
    }
    this.konobarService.dohvatiKonobara(this.konobarKor).subscribe((data: Konobar)=>{
      this.konobar = data;
      this.rezervacijaService.dohvatiSveRezervacijeZaKonobara(this.konobar.kor_ime).subscribe((data: Rezervacija[])=>{
        this.sveRezervacije = data;
        this.sveRezervacije = this.sortRezervacijeByVreme(this.sveRezervacije);
        this.restoranService.dohvatiRestoran(this.konobar.restoran).subscribe((data: Restoran)=>{
          this.restoran=data;
          this.rezervacijaService.dohvatiSveRezervacijeZaRestoran(this.restoran.naziv).subscribe((data: Rezervacija[])=>{
            this.sveRezervacijeRestorana = data;
            this.renderHistogram();
          })
          this.konobarService.dohvatiSveKonobare().subscribe((data: Konobar[])=>{
          this.sviKonobari=data
          this.sviKonobari=this.getKonobariForRestoran(this.restoran)
          this.renderColumnChart();
          this.renderPieChart();
          })
        })
      })
    })
    
  }
  sviKonobari:Konobar[]=[]
  restoran:Restoran=new Restoran
  konobarKor:string=""
  konobar:Konobar= new Konobar
  message:string=""
  sveRezervacije:Rezervacija[]=[]
  sveRezervacijeRestorana:Rezervacija[]=[]
  chart: any;

  renderHistogram() {
    const averageReservationsPerDayOfWeek = this.calculateAverageReservationsPerDayOfWeek();

    const dataPoints = Object.keys(averageReservationsPerDayOfWeek).map(dayOfWeek => ({
      label: dayOfWeek,
      y: averageReservationsPerDayOfWeek[dayOfWeek]
    }));

    console.log('Histogram Data Points:', dataPoints); // Log data points to verify

    this.chart = new CanvasJS.Chart("histogramContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Prosecan broj rezervacija po danu u nedelji"
      },
      axisX: {
        title: "Dan u nedelji"
      },
      axisY: {
        title: "Prosecan broj rezervacija",
        includeZero: false
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });

    this.chart.render();
  }

  calculateAverageReservationsPerDayOfWeek(): { [dayOfWeek: string]: number } {
    const dayOfWeekCounts: { [dayOfWeek: string]: number } = {};
    const dayOfWeekNames: string[] = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota'];

    // Initialize counts for each day of the week
    dayOfWeekNames.forEach(dayName => {
      dayOfWeekCounts[dayName] = 0;
    });

    // Count reservations for each day of the week
    this.sveRezervacijeRestorana.forEach(reservation => {
      const date = new Date(reservation.datumVreme);
      const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
      dayOfWeekCounts[dayOfWeekNames[dayOfWeek]]++;
    });

    // Calculate averages over the last 24 months (approximately)
    const today = new Date();
    const twentyFourMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 24, today.getDate());

    const filteredReservations = this.sveRezervacijeRestorana.filter(reservation => {
      const reservationDate = new Date(reservation.datumVreme);
      return reservationDate >= twentyFourMonthsAgo;
    });

    const averageReservationsPerDayOfWeek: { [dayOfWeek: string]: number } = {};
    dayOfWeekNames.forEach(dayName => {
      const totalReservations = filteredReservations.reduce((acc, reservation) => {
        const reservationDate = new Date(reservation.datumVreme);
        if (reservationDate.getDay() === dayOfWeekNames.indexOf(dayName)) {
          return acc + 1;
        }
        return acc;
      }, 0);
      averageReservationsPerDayOfWeek[dayName] = totalReservations / 24; // Assuming 24 months
    });

    return averageReservationsPerDayOfWeek;
  }



  renderColumnChart() {
    const dataPoints = this.getGuestsPerDay();
    console.log('Data Points:', dataPoints);

    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Broj gostiju po danu"
      },
      axisX: {
        title: "Datum",
        valueFormatString: "DD MMM"
      },
      axisY: {
        title: "Broj gostiju",
        includeZero: true,
        interval: 1, 
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });

    this.chart.render();
  }
  getKonobariForRestoran(restoran:Restoran): Konobar[] {
    return this.sviKonobari.filter(konobar => konobar.restoran === restoran.naziv);
  }

  getGuestsPerDay() {
    // Define the type for the accumulator
    interface GuestsPerDay {
      [date: string]: number;
    }

    // Aggregate guests per day
    const guestsPerDay: GuestsPerDay = this.sveRezervacije.reduce((acc: GuestsPerDay, rezervacija: any) => {
      const dat = this.parseDateString(rezervacija.datumVreme);
      const date = new Date(dat).toLocaleDateString('en-CA'); // Format date as YYYY-MM-DD
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] =acc[date]+ rezervacija.brojLjudi;
      return acc;
    }, {});
    console.log('Gosti po danu:', guestsPerDay);

    // Convert the aggregated data to CanvasJS dataPoints
    return Object.keys(guestsPerDay).map(date => ({
      x: new Date(date),
      y: guestsPerDay[date]
    }));
  }
  renderPieChart() {
    const konobarData:KonobarData[] = this.aggregateKonobarData();

    const dataPoints = konobarData.map(entry => ({
      y: entry.totalGuests,
      label: entry.konobar
    }));

    console.log('Pie Chart Data:', dataPoints); // Log data points to verify

    this.chart = new CanvasJS.Chart("pieChartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Distribucija gostiju po konobaru"
      },
      data: [{
        type: "pie",
        indexLabel: "{label} - {y}",
        startAngle: -90,
        dataPoints: dataPoints
      }]
    });

    this.chart.render();
  }

  aggregateKonobarData(): KonobarData[] {
    const konobarDataMap = new Map<string, number>();

    this.sveRezervacijeRestorana.forEach(rezervacija => {
      const konobar = rezervacija.konobar; // Assuming this is kor_ime
      const brojLjudi = rezervacija.brojLjudi;

      if (konobar) {
        if (konobarDataMap.has(konobar)) {
          konobarDataMap.set(konobar, konobarDataMap.get(konobar)! + brojLjudi); // Use non-null assertion operator (!)
        } else {
          konobarDataMap.set(konobar, brojLjudi);
        }
      }
    });

    const konobarData: KonobarData[] = [];
    konobarDataMap.forEach((value, key) => {
      const konobar = this.findKonobarById(key);
      if (konobar) {
        konobarData.push({ konobar: `${konobar.ime} ${konobar.prezime}`, totalGuests: value });
      }
    });

    return konobarData;
  }

  findKonobarById(id: string): Konobar | undefined {
    return this.sviKonobari.find(k => k.kor_ime === id);
  }

  parseDateString(dateString: string): Date {
    const [datePart, timePart] = dateString.split(' '); // Split date and time parts
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  }
  sortRezervacijeByVreme(rezervacije: Rezervacija[]): Rezervacija[] {
    return rezervacije.sort((a, b) => {
      const dateA = this.parseDateString(a.datumVreme);
      const dateB = this.parseDateString(b.datumVreme);
      
      if (dateA < dateB) {
        return 1;
      }
      if (dateA > dateB) {
        return -1;
      }
      return 0;
    });

  }
  logout(){
    localStorage.removeItem('ulogovankonobar');
    this.router.navigate(['']);
  }

}
