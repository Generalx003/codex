const departments = [
  { id: 'gastroenterology', label: 'Gastroenterology', area: 'abdomen', info: 'Stomach, liver & digestive care' },
  { id: 'cardiology', label: 'Cardiology', area: 'chest', info: 'Heart, circulation & chest pain' },
  { id: 'respiratory', label: 'Respiratory Medicine', area: 'chest', info: 'Lungs, breathing & asthma' },
  { id: 'neurology', label: 'Neurology', area: 'head', info: 'Brain, nerves & movement' },
  { id: 'orthopaedics', label: 'Orthopaedics', area: 'arms', info: 'Bones, joints & sports injuries' },
  { id: 'nephrology', label: 'Nephrology', area: 'abdomen', info: 'Kidneys & urinary tract' },
  { id: 'urology', label: 'Urology', area: 'pelvis', info: 'Bladder, prostate & urinary health' },
  { id: 'general-surgery', label: 'General Surgery', area: 'abdomen', info: 'Hernia, gallbladder & elective surgery' },
  { id: 'obgyn', label: 'Obstetrics & Gynecology', area: 'pelvis', info: 'Women’s health & pregnancy' },
  { id: 'dermatology', label: 'Dermatology', area: 'head', info: 'Skin, scalp & nails' },
  { id: 'endocrinology', label: 'Endocrinology', area: 'abdomen', info: 'Diabetes, thyroid & hormones' },
  { id: 'vascular', label: 'Vascular Surgery', area: 'legs', info: 'Veins, circulation & limbs' }
];

const doctors = [
  {
    name: 'Dr. Iftekhar Imam',
    role: 'Senior Consultant',
    dept: 'gastroenterology',
    qualifications: 'MBBS, FCPS (Gastroenterology)',
    years: 18
  },
  {
    name: 'Prof. Dr. Farida Nahar',
    role: 'Head of Cardiology',
    dept: 'cardiology',
    qualifications: 'MBBS, MD (Cardiology)',
    years: 22
  },
  {
    name: 'Dr. Md. Golam Mustafa',
    role: 'Associate Professor',
    dept: 'general-surgery',
    qualifications: 'MBBS, FCPS (Surgery)',
    years: 15
  },
  {
    name: 'Dr. Ayesha Rahman',
    role: 'Consultant Neurologist',
    dept: 'neurology',
    qualifications: 'MBBS, MD (Neurology)',
    years: 12
  },
  {
    name: 'Dr. Mohammad Karim',
    role: 'Senior Orthopaedic Surgeon',
    dept: 'orthopaedics',
    qualifications: 'MBBS, MS (Ortho)',
    years: 16
  },
  {
    name: 'Dr. Farid Ahmed',
    role: 'Consultant Respiratory Medicine',
    dept: 'respiratory',
    qualifications: 'MBBS, MD (Pulmonology)',
    years: 10
  },
  {
    name: 'Dr. Nusrat Jahan',
    role: 'Consultant Nephrologist',
    dept: 'nephrology',
    qualifications: 'MBBS, MD (Nephrology)',
    years: 11
  },
  {
    name: 'Prof. Dr. Kamal Uddin',
    role: 'Chief Urologist',
    dept: 'urology',
    qualifications: 'MBBS, FCPS (Urology)',
    years: 20
  },
  {
    name: 'Dr. Rehana Akter',
    role: 'Gynecology Consultant',
    dept: 'obgyn',
    qualifications: 'MBBS, FCPS (OBGYN)',
    years: 13
  },
  {
    name: 'Dr. Atik Chowdhury',
    role: 'Dermatology Specialist',
    dept: 'dermatology',
    qualifications: 'MBBS, DDV',
    years: 9
  },
  {
    name: 'Dr. Sanjoy Mitra',
    role: 'Endocrinology Consultant',
    dept: 'endocrinology',
    qualifications: 'MBBS, MD (Endocrinology)',
    years: 14
  },
  {
    name: 'Dr. Nafizul Alam',
    role: 'Vascular Surgeon',
    dept: 'vascular',
    qualifications: 'MBBS, MS (Vascular)',
    years: 8
  }
];

let doctorList;
let doctorCount;
let departmentChips;
let hitboxes;
let loadingMessage;

let activeArea = 'abdomen';
let activeDepartment = 'gastroenterology';

function buildChips() {
  departments.forEach((dept) => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.dataset.dept = dept.id;
    chip.dataset.area = dept.area;
    chip.innerHTML = `<div>${dept.label}</div><small>${dept.info}</small>`;
    chip.addEventListener('click', () => {
      setDepartment(dept.id);
    });
    departmentChips.appendChild(chip);
  });
}

function setDepartment(deptId) {
  const dept = departments.find((d) => d.id === deptId);
  if (!dept) return;
  activeDepartment = deptId;
  activeArea = dept.area;
  render();
}

function setArea(area) {
  const candidate = departments.find((d) => d.area === area);
  if (candidate) {
    activeArea = area;
    activeDepartment = candidate.id;
    render();
  }
}

function renderHitboxes() {
  hitboxes.forEach((box) => {
    box.classList.toggle('active', box.dataset.area === activeArea);
  });
}

function renderChips() {
  const chips = departmentChips.querySelectorAll('.chip');
  chips.forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.dept === activeDepartment);
  });
}

function renderDoctors() {
  doctorList.innerHTML = '';
  const filtered = doctors.filter((doc) => doc.dept === activeDepartment);
  doctorCount.textContent = `${filtered.length} doctor${filtered.length === 1 ? '' : 's'} available`;

  filtered.forEach((doc) => {
    const card = document.createElement('article');
    card.className = 'card';

    const initials = doc.name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('');

    card.innerHTML = `
      <div class="avatar" aria-hidden="true">${initials}</div>
      <div class="details">
        <div class="meta">${doc.role} · ${doc.years}+ yrs exp</div>
        <h3>${doc.name}</h3>
        <p>${doc.qualifications}</p>
        <button class="btn">Book Now</button>
      </div>
    `;

    doctorList.appendChild(card);
  });
}

function render() {
  renderHitboxes();
  renderChips();
  renderDoctors();
}

function init() {
  doctorList = document.getElementById('doctorList');
  doctorCount = document.getElementById('doctorCount');
  departmentChips = document.getElementById('departmentChips');
  hitboxes = Array.from(document.querySelectorAll('.hitbox'));
  loadingMessage = document.getElementById('loadingMessage');

  if (!doctorList || !doctorCount || !departmentChips || hitboxes.length === 0) {
    return;
  }

  if (loadingMessage) {
    loadingMessage.remove();
  }

  buildChips();
  render();

  hitboxes.forEach((box) => {
    box.addEventListener('click', () => {
      setArea(box.dataset.area);
    });
  });
}

document.addEventListener('DOMContentLoaded', init);
