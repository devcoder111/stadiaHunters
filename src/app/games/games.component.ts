import { Component, OnInit } from '@angular/core';
import { SeoService } from "../seo/seo.service";
import { PaginationService } from "../services/pagination/pagination.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['../../assets/styles/games.component.sass']
})
export class GamesComponent implements OnInit {

  meta_data = {
    title: 'Games | Stadia Hunters',
    description: 'Full list of games on Stadia.',
    image:'https://firebasestorage.googleapis.com/v0/b/stadiaachievements-34145.appspot.com/o/Achievements%20%26%20Guides%20(7).png?alt=media&token=64343a06-8dcd-45f6-bf80-ee6b34de4ab4', 
  }

  showDropdown = false
  selected = 'launchDate'

  constructor(
    public page: PaginationService, 
    private seo: SeoService,) { 

    }

  ngOnInit(): void {
    this.seo.generateTags(this.meta_data)
    this.fetchGames()
  }

  fetchGames(field:string = "launchDate", query:string = "", reverse: boolean = true){
    this.page.init('games', field, { limit: 36, reverse: reverse, prepend: false })
  }

  scrollHandler(e:any) {
    if (e === 'bottom') {
      this.page.more()
    }
  }

  showDialog() {
    this.showDropdown = !this.showDropdown
  }

  buildDropdownText(){
    switch (this.selected) {
      case 'launchDate':
          return `Sort by : Release`
      case 'owned':
        return `Sort by : Popular`
      case 'completed':
        return `Sort by : Completions`
      case 'achievements':
          return `Sort by : Achievements`
      case 'achievements_secret':
        return `Sort by : Secret Achievements`
      case 'achievements_bugged':
        return `Sort by : Bugged Achievements`
      case 'achievements_timed':
        return `Sort by : Timed Achievements`
      case 'achievements_dlc':
        return `Sort by : Required DLC`
      default:
        return `Sort by : Release` 
    }
  }

  sort(type: string){
    console.log(type)
    this.showDialog()
    if(type !== this.selected){
      this.selected = type
      this.fetchGames(type)
    }
  }
}
