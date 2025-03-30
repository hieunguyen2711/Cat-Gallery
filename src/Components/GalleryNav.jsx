import React from "react";

const GalleryNav = ({images, descriptions}) => {

    return (
        <div className="gallery-nav">
            <h2>Your Cat Gallery</h2>
            
            <div className="history-container">
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <li key={index}>
                            <img  src={image} alt={`Cat Pic #${index + 1}`} className="cat-pic" width="70px" height="70px"  />
                            <p>{descriptions[index]}</p>
                        </li>
                        
                        
                    ))
                ):(
                    
                    <h3>You haven't had any cat pictures yet</h3>
                    
                )}
            </div>
            
                
                
                
                
                    
     
                
        </div>
    )
}

export default GalleryNav;