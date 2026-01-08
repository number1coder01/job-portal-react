import Hero from '../components/Hero' ;
import HomeCards from '../components/HomeCards' ; 
import JobListings from '../components/JobsListings'
import ViewAll from '../components/ViewAll'

const HomePage = () => {
  return (
    <>
        <Hero/> 
        <HomeCards/>
        <JobListings isHome = "true"/>
        <ViewAll/>
    </>
  )
}

export default HomePage