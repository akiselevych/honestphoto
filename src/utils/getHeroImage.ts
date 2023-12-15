export async function getHeroImage(id: number){
    const res = await fetch(`https://api.honest-photography.com/api/v1/hero-images/${id}/`);
    return res.json();
}

