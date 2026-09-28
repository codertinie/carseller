const WHATSAPP_NUMBER = '';
		const ADMIN_PASSWORD = 'martin2026';
		const STORAGE_KEYS = { cars: 'martin-motors-cars', favorites: 'martin-motors-favorites', likes: 'martin-motors-likes' };
		function readStored(key, fallback) {
			try {
				const value = localStorage.getItem(key);
				return value === null ? fallback : JSON.parse(value);
			} catch {
				return fallback;
			}
		}
		function writeStored(key, value) {
			try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
		}
		const defaultCars = [
			{id:1,make:'Toyota',model:'RAV4',trim:'XLE Premium AWD',year:2022,price:4283500,mileage:45721,body:'SUV',fuel:'Hybrid',transmission:'Automatic',color:'Magnetic Gray',badge:'Just arrived',image:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=82',description:'A confident, comfortable all-rounder with the efficiency and everyday practicality that made the RAV4 a favorite. Clean history, beautifully kept, and ready for its next chapter.'},
			{id:2,make:'BMW',model:'330i',trim:'Sport Line RWD',year:2021,price:3874000,mileage:51740,body:'Sedan',fuel:'Gasoline',transmission:'Automatic',color:'Alpine White',badge:'Staff pick',image:'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=82',description:'Sharp steering, a lovely cabin, and just the right amount of sport. This 330i has been carefully maintained and is a joy on the weekday commute or the long way home.'},
			{id:3,make:'Ford',model:'Mustang',trim:'GT Premium Coupe',year:2020,price:5057000,mileage:39912,body:'Coupe',fuel:'Gasoline',transmission:'Manual',color:'Race Red',badge:'A little special',image:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=82',description:'The kind of car that makes a reason to take the scenic route. A V8 GT with a proper manual gearbox, well cared for and full of character.'},
			{id:4,make:'Honda',model:'Civic',trim:'Sport Touring Hatchback',year:2023,price:3588000,mileage:24011,body:'Hatchback',fuel:'Gasoline',transmission:'Automatic',color:'Sonic Gray Pearl',badge:'Low mileage',image:'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&w=1200&q=82',description:'Smart, efficient, and surprisingly fun. This top-trim Civic adds thoughtful comfort and a flexible hatchback shape, with very low miles and an excellent service record.'},
			{id:5,make:'Jeep',model:'Wrangler',trim:'Unlimited Sahara 4x4',year:2021,price:4667000,mileage:57775,body:'SUV',fuel:'Gasoline',transmission:'Automatic',color:'Sarge Green',badge:'Adventure ready',image:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=82',description:'Doors off, top down, weekend sorted. A well-equipped Sahara with four-wheel drive and the easygoing confidence that makes every detour an invitation.'},
			{id:6,make:'Mercedes-Benz',model:'C 300',trim:'4MATIC Sedan',year:2022,price:4517500,mileage:35018,body:'Sedan',fuel:'Gasoline',transmission:'Automatic',color:'Selenite Gray',badge:'Great value',image:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=82',description:'Quietly elegant with a polished, comfortable ride. This C 300 pairs all-wheel-drive confidence with a thoughtfully appointed cabin and a full maintenance history.'},
			{id:7,make:'Subaru',model:'Outback',trim:'Limited XT AWD',year:2022,price:4147000,mileage:48441,body:'SUV',fuel:'Gasoline',transmission:'Automatic',color:'Autumn Green',badge:'Ready to roam',image:'https://images.unsplash.com/photo-1519583272095-6433daf26b6e?auto=format&fit=crop&w=1200&q=82',description:'Room for people, dogs, and the things you pick up along the way. A capable Outback with turbo power, all-wheel drive, and a clean bill of health.'},
			{id:8,make:'Mazda',model:'MX-5 Miata',trim:'Grand Touring',year:2021,price:3497000,mileage:29290,body:'Convertible',fuel:'Gasoline',transmission:'Manual',color:'Soul Red Crystal',badge:'Weekend favorite',image:'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=82',description:'Light, balanced, and gloriously uncomplicated. A carefully kept Miata with a six-speed manual and the sort of charm that never needs a special occasion.'},
			{id:9,make:'Ford',model:'F-150',trim:'Lariat SuperCrew 4x4',year:2020,price:4797000,mileage:68719,body:'Truck',fuel:'Gasoline',transmission:'Automatic',color:'Carbonized Gray',badge:'Hard worker',image:'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?auto=format&fit=crop&w=1200&q=82',description:'Ready for the big jobs and comfortable enough for every day. A well-equipped SuperCrew with four-wheel drive, honest miles, and a thorough inspection behind it.'}
		];
		const storedCars = readStored(STORAGE_KEYS.cars, defaultCars);
		const cars = Array.isArray(storedCars) ? storedCars : defaultCars;
		const storedFavorites = readStored(STORAGE_KEYS.favorites, []);
		const favorites = new Set(Array.isArray(storedFavorites) ? storedFavorites.map(Number) : []);
		const storedLikes = readStored(STORAGE_KEYS.likes, {});
		const likes = storedLikes && typeof storedLikes === 'object' ? storedLikes : {};
		const compare = new Set();
		let adminAuthenticated = false;
		let editingCarId = null;
		const grid = document.getElementById('carGrid');
		const money = value => 'KSh ' + value.toLocaleString('en-KE');
		const iconHeart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>';
		const iconCompare = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3m13 5h3a2 2 0 0 0 2-2v-3M8 12h8m-3-3 3 3-3 3"/></svg>';
		const whatsAppUrl = message => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
		document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsAppUrl('Hi Martin Motors! I\'m interested in learning more about your cars.'); link.target = '_blank'; link.rel = 'noopener'; });
		document.getElementById('year').textContent = new Date().getFullYear();
		const makeFilter = document.getElementById('makeFilter');
		function populateMakeFilter() {
			const selectedMake = makeFilter.value;
			makeFilter.innerHTML = '<option value="">All makes</option>';
			[...new Set(cars.map(car => car.make))].sort().forEach(make => makeFilter.add(new Option(make,make)));
			if ([...makeFilter.options].some(option => option.value === selectedMake)) makeFilter.value = selectedMake;
		}
		populateMakeFilter();
		function filteredCars() {
			const keyword = document.getElementById('keywordFilter').value.trim().toLowerCase();
			const make = makeFilter.value;
			const body = document.getElementById('bodyFilter').value;
			const maxPrice = Number(document.getElementById('priceFilter').value) || Infinity;
			const favoritesOnly = grid.dataset.favorites === 'true';
			let result = cars.filter(car => (!keyword || `${car.make} ${car.model} ${car.trim} ${car.year} ${car.body}`.toLowerCase().includes(keyword)) && (!make || car.make === make) && (!body || car.body === body) && car.price <= maxPrice && (!favoritesOnly || favorites.has(car.id)));
			const sorting = document.getElementById('sortFilter').value;
			if (sorting === 'price-asc') result.sort((a,b) => a.price-b.price);
			if (sorting === 'price-desc') result.sort((a,b) => b.price-a.price);
			if (sorting === 'year-desc') result.sort((a,b) => b.year-a.year);
			if (sorting === 'mileage-asc') result.sort((a,b) => a.mileage-b.mileage);
			return result;
		}
		function carCard(car, index) {
			const isSaved = favorites.has(car.id);
			const isCompared = compare.has(car.id);
			const featured = car.badge === 'Staff pick';
			return `<article class="car-card" style="animation-delay:${Math.min(index*45,270)}ms"><div class="car-image-wrap"><img class="car-image" src="${car.image}" alt="${car.year} ${car.make} ${car.model}" loading="lazy"><span class="badge ${featured?'featured':''}">${car.badge}</span><div class="card-tools"><button class="card-tool ${isSaved?'selected':''}" data-favorite="${car.id}" aria-label="${isSaved?'Remove from':'Save to'} favorites" title="${isSaved?'Remove from':'Save to'} favorites">${iconHeart}</button><button class="card-tool ${isCompared?'selected':''}" data-compare="${car.id}" aria-label="${isCompared?'Remove from':'Add to'} compare" title="Compare">${iconCompare}</button></div></div><div class="card-body"><div class="car-topline"><span>${car.year} · ${car.body}</span><span class="condition">Inspected</span></div><h3 class="car-title">${car.make} ${car.model}</h3><div class="car-trim">${car.trim}</div><div class="specs"><span class="spec"><strong>${car.mileage.toLocaleString()} km</strong>Mileage</span><span class="spec"><strong>${car.fuel}</strong>Fuel</span><span class="spec"><strong>${car.transmission}</strong>Gearbox</span><span class="spec"><strong>${car.color}</strong>Color</span></div><div class="price-row"><div><span class="price">${money(car.price)}</span><span class="price-note">Clear, upfront price</span></div><button class="details-link" data-details="${car.id}">Full details</button></div><a class="button card-cta" data-car-whatsapp="${car.id}" href="${whatsAppUrl(`Hi Martin Motors! I'm interested in the ${car.year} ${car.make} ${car.model}. Is it available?`)}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20l.9-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.3 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4 0 .6.4.7 1 1.3 1.7 1.7.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.4.7c.3.1.4.3.3.6-.1.5-.4 1-.9 1.3-.5.3-1 .4-1.6.2-1-.3-2.2-.9-3.3-2-1.1-1-1.8-2.3-2-3.2-.2-.6 0-1.2.3-1.6Z"/></svg> Ask about this car</a></div></article>`;
		}
		function renderCars() {
			const result = filteredCars();
			document.getElementById('resultCount').textContent = `${result.length} ${result.length === 1 ? 'car' : 'cars'}`;
			const active = [];
			if (document.getElementById('keywordFilter').value) active.push(document.getElementById('keywordFilter').value);
			if (makeFilter.value) active.push(makeFilter.value);
			if (document.getElementById('bodyFilter').value) active.push(document.getElementById('bodyFilter').value);
			if (document.getElementById('priceFilter').value) active.push(`Under ${money(Number(document.getElementById('priceFilter').value))}`);
			if (grid.dataset.favorites === 'true') active.push('Saved cars');
			document.getElementById('activeFilters').innerHTML = active.map(item => `<span class="filter-chip">${item}</span>`).join('');
			grid.innerHTML = result.length ? result.map(carCard).join('') : '<div class="no-results"><strong>No cars found just yet.</strong>Try changing your filters, or clear them to see everything.</div>';
			updateFavoriteCount();
			updateCompareBar();
		}
		function renderAdminInventory() {
			const list = document.getElementById('adminVehicleList');
			list.innerHTML = cars.length ? cars.map(car => `<article class="admin-vehicle-row"><div><strong class="admin-vehicle-title">${car.year} ${car.make} ${car.model}</strong><span class="admin-vehicle-meta">${money(car.price)} · ${Number(car.mileage).toLocaleString()} km · ${car.body}</span></div><div class="admin-vehicle-actions"><button type="button" data-edit-car="${car.id}">Edit</button><button class="delete-vehicle" type="button" data-delete-car="${car.id}">Delete</button></div></article>`).join('') : '<div class="admin-empty">No vehicles yet. Add your first listing.</div>';
		}
		function renderAdminLikes() {
			const list = document.getElementById('adminLikesList');
			const popular = [...cars].sort((first,second) => (Number(likes[second.id]) || 0) - (Number(likes[first.id]) || 0) || first.price - second.price);
			list.innerHTML = popular.length ? popular.map((car,index) => `<article class="admin-vehicle-row"><div><strong class="admin-vehicle-title">${index + 1}. ${car.year} ${car.make} ${car.model}</strong><span class="admin-vehicle-meta">${money(car.price)} · ${Number(car.mileage).toLocaleString()} km</span></div><strong class="admin-like-count">${Number(likes[car.id]) || 0} likes</strong></article>`).join('') : '<div class="admin-empty">No vehicles to rank yet.</div>';
		}
		function setAdminView(view) {
			const likesView = view === 'likes';
			document.getElementById('adminInventoryView').hidden = likesView;
			document.getElementById('adminLikesView').hidden = !likesView;
			document.getElementById('adminInventoryTab').classList.toggle('active',!likesView);
			document.getElementById('adminLikesTab').classList.toggle('active',likesView);
			document.getElementById('adminInventoryTab').setAttribute('aria-selected',String(!likesView));
			document.getElementById('adminLikesTab').setAttribute('aria-selected',String(likesView));
			if (likesView) renderAdminLikes();
		}
		function openAdmin() {
			const modal = document.getElementById('adminModal');
			modal.hidden = false;
			modal.classList.add('open');
			document.body.style.overflow = 'hidden';
			document.getElementById('adminLoginForm').hidden = adminAuthenticated;
			document.getElementById('adminWorkspace').hidden = !adminAuthenticated;
			document.getElementById('adminHeading').textContent = adminAuthenticated ? 'Manage your listings' : 'Admin access';
			if (adminAuthenticated) {
				renderAdminInventory();
				renderAdminLikes();
				document.getElementById('addVehicle').focus();
			} else {
				document.getElementById('adminPassword').focus();
			}
		}
		function closeAdmin() {
			const modal = document.getElementById('adminModal');
			modal.classList.remove('open');
			modal.hidden = true;
			document.body.style.overflow = '';
		}
		function resetVehicleForm() {
			document.getElementById('vehicleForm').reset();
			document.getElementById('vehicleForm').hidden = true;
			document.getElementById('saveVehicle').textContent = 'Save vehicle';
			editingCarId = null;
		}
		function editVehicle(id) {
			const car = cars.find(item => Number(item.id) === id);
			if (!car) return;
			editingCarId = id;
			for (const field of ['Make','Model','Trim','Year','Price','Mileage','Body','Fuel','Transmission','Color','Badge','Image','Description']) {
				document.getElementById(`vehicle${field}`).value = car[field.toLowerCase()] ?? '';
			}
			document.getElementById('saveVehicle').textContent = 'Update vehicle';
			document.getElementById('vehicleForm').hidden = false;
			document.getElementById('vehicleForm').scrollIntoView({behavior:'smooth',block:'nearest'});
			document.getElementById('vehicleMake').focus();
		}
		function deleteVehicle(id) {
			const car = cars.find(item => Number(item.id) === id);
			if (!car || !confirm(`Delete ${car.year} ${car.make} ${car.model}?`)) return;
			cars.splice(cars.indexOf(car),1);
			favorites.delete(id);
			compare.delete(id);
			delete likes[id];
			writeStored(STORAGE_KEYS.cars,cars);
			writeStored(STORAGE_KEYS.favorites,[...favorites]);
			writeStored(STORAGE_KEYS.likes,likes);
			populateMakeFilter();
			renderCars();
			renderAdminInventory();
			renderAdminLikes();
			resetVehicleForm();
		}
		function updateFavoriteCount() {
			const count = document.getElementById('favoriteCount');
			count.textContent = favorites.size;
			count.classList.toggle('has-items',favorites.size>0);
		}
		function updateCompareBar() {
			const bar = document.getElementById('compareBar');
			bar.classList.toggle('visible',compare.size>0);
			document.getElementById('compareLabel').textContent = `${compare.size} car${compare.size===1?'':'s'} selected`;
			document.getElementById('compareAction').disabled = compare.size < 2;
			document.getElementById('compareAction').style.opacity = compare.size < 2 ? '.5' : '1';
		}
		function showToast(message) {
			const toast = document.getElementById('toast');
			toast.textContent = message;
			toast.classList.add('show');
			clearTimeout(showToast.timer);
			showToast.timer = setTimeout(() => toast.classList.remove('show'),2400);
		}
		document.getElementById('searchForm').addEventListener('submit',event => { event.preventDefault(); grid.dataset.favorites='false'; renderCars(); document.getElementById('inventory').scrollIntoView({behavior:'smooth'}); });
		document.getElementById('sortFilter').addEventListener('change',renderCars);
		document.getElementById('resetFilters').addEventListener('click',() => { document.getElementById('searchForm').reset(); grid.dataset.favorites='false'; renderCars(); });
		document.getElementById('favoritesJump').addEventListener('click',() => { grid.dataset.favorites = grid.dataset.favorites === 'true' ? 'false' : 'true'; renderCars(); document.getElementById('inventory').scrollIntoView({behavior:'smooth'}); });
		document.getElementById('carGrid').addEventListener('click',event => {
			const favoriteButton = event.target.closest('[data-favorite]');
			const compareButton = event.target.closest('[data-compare]');
			const detailsButton = event.target.closest('[data-details]');
			if (favoriteButton) {
				const id = Number(favoriteButton.dataset.favorite);
				if (favorites.has(id)) {
					favorites.delete(id);
					likes[id] = Math.max(0,(Number(likes[id]) || 0) - 1);
				} else {
					favorites.add(id);
					likes[id] = (Number(likes[id]) || 0) + 1;
				}
				writeStored(STORAGE_KEYS.favorites,[...favorites]);
				writeStored(STORAGE_KEYS.likes,likes);
				renderCars();
				if (adminAuthenticated) renderAdminLikes();
				showToast(favorites.has(id) ? 'Saved to your favorites' : 'Removed from your favorites');
			}
			if (compareButton) { const id=Number(compareButton.dataset.compare); if(!compare.has(id)&&compare.size>=3){showToast('You can compare up to 3 cars at a time');return;} compare.has(id)?compare.delete(id):compare.add(id); renderCars(); }
			if (detailsButton) openDetails(Number(detailsButton.dataset.details));
		});
		document.querySelectorAll('[data-footer-filter]').forEach(link => link.addEventListener('click',() => { document.getElementById('bodyFilter').value=link.dataset.footerFilter; grid.dataset.favorites='false'; renderCars(); }));
		document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click',() => { document.querySelectorAll('[data-view]').forEach(item=>item.classList.toggle('active',item===button)); grid.style.gridTemplateColumns=button.dataset.view==='list'?'1fr':''; if(button.dataset.view==='list') grid.querySelectorAll('.car-card').forEach(card=>{card.style.display='grid';card.style.gridTemplateColumns='minmax(220px, .8fr) 1fr';card.querySelector('.car-image-wrap').style.height='100%';card.querySelector('.car-image-wrap').style.aspectRatio='auto';}); else {grid.querySelectorAll('.car-card').forEach(card=>{card.style.display='';card.style.gridTemplateColumns='';card.querySelector('.car-image-wrap').style.height='';card.querySelector('.car-image-wrap').style.aspectRatio='';});} }));
		function openDetails(id) {
			const car = cars.find(item=>item.id===id);
			document.getElementById('modalImage').src=car.image;
			document.getElementById('modalImage').alt=`${car.year} ${car.make} ${car.model}`;
			document.getElementById('modalContent').innerHTML=`<div class="eyebrow">${car.badge} · Inspected</div><h2 id="modalTitle">${car.year} ${car.make} ${car.model}</h2><p>${car.trim} · ${car.color}</p><div class="modal-specs"><div><strong>${car.mileage.toLocaleString()} km</strong>Mileage</div><div><strong>${car.fuel}</strong>Fuel type</div><div><strong>${car.transmission}</strong>Transmission</div><div><strong>${car.body}</strong>Body style</div></div><p>${car.description}</p><div class="modal-actions"><div><span class="modal-price">${money(car.price)}</span><span class="price-note">Clear, upfront price</span></div><a class="button" href="${whatsAppUrl(`Hi Martin Motors! I'd love to know more about the ${car.year} ${car.make} ${car.model} (${car.trim}). Could I arrange a viewing or test drive?`)}" target="_blank" rel="noopener">Message us about this car <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20l.9-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.3 8.2c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.6 1.4c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4 0 .6.4.7 1 1.3 1.7 1.7.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.4.7c.3.1.4.3.3.6-.1.5-.4 1-.9 1.3-.5.3-1 .4-1.6.2-1-.3-2.2-.9-3.3-2-1.1-1-1.8-2.3-2-3.2-.2-.6 0-1.2.3-1.6Z"/></svg></a></div>`;
			document.getElementById('carModal').classList.add('open');
			document.body.style.overflow='hidden';
			document.getElementById('modalClose').focus();
		}
		function closeDetails(){document.getElementById('carModal').classList.remove('open');document.body.style.overflow='';}
		document.getElementById('modalClose').addEventListener('click',closeDetails);
		document.getElementById('carModal').addEventListener('click',event=>{if(event.target.id==='carModal')closeDetails();});
		document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeDetails();closeAdmin();}});
		document.getElementById('clearCompare').addEventListener('click',()=>{compare.clear();renderCars();});
		document.getElementById('compareAction').addEventListener('click',()=>{if(compare.size<2)return;const chosen=cars.filter(car=>compare.has(car.id));const summary=chosen.map(car=>`${car.year} ${car.make} ${car.model} — ${money(car.price)}, ${car.mileage.toLocaleString()} km, ${car.fuel}`).join('\n');showToast('Opening your comparison in a new message');window.open(whatsAppUrl(`Hi Martin Motors! I'm comparing these cars and would love your advice:\n${summary}`),'_blank','noopener');});
		document.getElementById('adminOpen').addEventListener('click',openAdmin);
		document.getElementById('adminClose').addEventListener('click',closeAdmin);
		document.getElementById('adminModal').addEventListener('click',event=>{if(event.target.id==='adminModal')closeAdmin();});
		document.getElementById('adminLoginForm').addEventListener('submit',event=>{
			event.preventDefault();
			const password = document.getElementById('adminPassword');
			if (password.value !== ADMIN_PASSWORD) {
				document.getElementById('adminLoginError').hidden = false;
				password.select();
				return;
			}
			adminAuthenticated = true;
			document.getElementById('adminLoginError').hidden = true;
			document.getElementById('adminLoginForm').hidden = true;
			document.getElementById('adminWorkspace').hidden = false;
			document.getElementById('adminHeading').textContent = 'Manage your listings';
			document.getElementById('adminSubheading').textContent = 'Inventory and shopper likes saved in this browser.';
			password.value = '';
			setAdminView('inventory');
			renderAdminInventory();
			document.getElementById('addVehicle').focus();
		});
		document.getElementById('adminLogout').addEventListener('click',()=>{
			adminAuthenticated = false;
			resetVehicleForm();
			openAdmin();
		});
		document.querySelectorAll('[data-admin-view]').forEach(button=>button.addEventListener('click',()=>setAdminView(button.dataset.adminView)));
		document.getElementById('addVehicle').addEventListener('click',()=>{
			resetVehicleForm();
			document.getElementById('vehicleForm').hidden = false;
			document.getElementById('vehicleMake').focus();
		});
		document.getElementById('cancelVehicle').addEventListener('click',resetVehicleForm);
		document.getElementById('vehicleForm').addEventListener('submit',event=>{
			event.preventDefault();
			const record = {
				id: editingCarId ?? Math.max(0,...cars.map(car=>Number(car.id)||0))+1,
				make: document.getElementById('vehicleMake').value.trim(),
				model: document.getElementById('vehicleModel').value.trim(),
				trim: document.getElementById('vehicleTrim').value.trim(),
				year: Number(document.getElementById('vehicleYear').value),
				price: Number(document.getElementById('vehiclePrice').value),
				mileage: Number(document.getElementById('vehicleMileage').value),
				body: document.getElementById('vehicleBody').value,
				fuel: document.getElementById('vehicleFuel').value.trim(),
				transmission: document.getElementById('vehicleTransmission').value.trim(),
				color: document.getElementById('vehicleColor').value.trim(),
				badge: document.getElementById('vehicleBadge').value.trim() || 'New arrival',
				image: document.getElementById('vehicleImage').value.trim() || defaultCars[0].image,
				description: document.getElementById('vehicleDescription').value.trim()
			};
			if (editingCarId === null) cars.push(record);
			else cars.splice(cars.findIndex(car=>Number(car.id)===editingCarId),1,record);
			writeStored(STORAGE_KEYS.cars,cars);
			populateMakeFilter();
			renderCars();
			renderAdminInventory();
			renderAdminLikes();
			resetVehicleForm();
		});
		document.getElementById('adminVehicleList').addEventListener('click',event=>{
			const editButton = event.target.closest('[data-edit-car]');
			const deleteButton = event.target.closest('[data-delete-car]');
			if (editButton) editVehicle(Number(editButton.dataset.editCar));
			if (deleteButton) deleteVehicle(Number(deleteButton.dataset.deleteCar));
		});
		renderCars();