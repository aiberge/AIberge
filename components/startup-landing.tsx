'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars,  } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, Code, Cpu, Users, Mail, Phone, MapPin, Calendar as CalendarIcon, PlayCircle } from "lucide-react"
import Image from 'next/image'
import { TypewriterEffect } from '@/components/TypewriterEffect'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"

function GeometricArtifact() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const lineRef = useRef<THREE.LineSegments>(null!)
  
  const points = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(2.1, 0)
    const positionAttribute = geometry.getAttribute('position')
    const positions = []
    for (let i = 0; i < positionAttribute.count; i++) {
      positions.push(new THREE.Vector3().fromBufferAttribute(positionAttribute, i))
    }
    return positions
  }, [])

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const indices = []
    for (let i = 0; i < points.length; i += 3) {
      indices.push(i, i + 1, i + 1, i + 2, i + 2, i)
    }
    geometry.setIndex(indices)
    return geometry
  }, [points])

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.1
    meshRef.current.rotation.y += delta * 0.15
    lineRef.current.rotation.x += delta * 0.1
    lineRef.current.rotation.y += delta * 0.15
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
          color="#2F4F4F" 
          metalness={0.9}
          roughness={0.1}
          emissive="#424242"
          emissiveIntensity={0.5}
        />
      </mesh>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#B3B3B3" linewidth={2} />
      </lineSegments>
    </group>
  )
}

function MovingStars() {
  const starsRef = useRef<THREE.Points>(null!)

  useFrame((state, delta) => {
    starsRef.current.rotation.y += delta * 0.02
  })

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
}

function Meteor() {
  const meteorRef = useRef<THREE.Mesh>(null!)
  const [isVisible, setIsVisible] = useState(false)
  const startPosition = useMemo(() => new THREE.Vector3(Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50), [])

  useFrame((state, delta) => {
    if (isVisible) {
      meteorRef.current.position.x -= delta * 50
      meteorRef.current.position.y -= delta * 50
      meteorRef.current.position.z -= delta * 50

      if (meteorRef.current.position.length() < 10) {
        setIsVisible(false)
      }
    } else if (Math.random() < 0.001) {
      meteorRef.current.position.copy(startPosition)
      setIsVisible(true)
    }
  })

  return (
    <mesh ref={meteorRef} visible={isVisible}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#FFFFFF" />
    </mesh>
  )
}

export function StartupLandingComponent() {
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState('contact')
  const [companyType, setCompanyType] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(70), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted email:', email)
    setEmail('')
  }

  const toggleMode = (newMode: string) => {
    setMode(newMode)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <GeometricArtifact />
          <MovingStars />
          <Meteor />
          <Meteor />
          <Meteor />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="h-8">
            <Image
              src="/img/logo-light.png"
              alt="Aiberg Logo"
              width={120}
              height={32}
              className="h-full w-auto"
            />
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#product" className="hover:text-teal-400 transition-colors">Product</a></li>
              <li><a href="#about" className="hover:text-teal-400 transition-colors">About</a></li>
              <li><a href="#demo" className="hover:text-teal-400 transition-colors">Demo</a></li>
              <li><a href="#contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </header>

        <main className="container mx-auto px-4">
          <section id="hero" className="flex flex-col items-center justify-center min-h-screen text-center py-20">
            <h1 className="text-6xl font-bold mb-8 animate-fade-in">Shaping Tomorrow with AI</h1>
            <p className="text-2xl mb-12 max-w-3xl mx-auto font-mono font-['Ubuntu_Mono']">
              <TypewriterEffect
                text="Step into the future with our groundbreaking AI-powered solutions, designed to transform the way you experience technology."
                typingSpeed={50}
                deletingSpeed={30}
                pauseDuration={7000}
                loop={true}
              />
            </p>
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-xl py-6 px-10 animate-fade-in animation-delay-600">
              Get Started <ChevronRight className="ml-2 h-6 w-6" />
            </Button>
          </section>

          <section id="product" className="py-32">
            <h2 className="text-5xl font-bold mb-16 text-center">Our <span style={{ color: '#0D9488' }}>Focus</span></h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="bg-gray-800 bg-opacity-50 p-10 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                <Code className="w-16 h-16 mb-6 text-teal-400" />
                <h3 className="text-2xl font-semibold mb-4">AI Solutions Development</h3>
                <p className="text-lg">Build customized AI solutions designed to meet the unique challenges of your business. From smart coding tools to advanced data processing systems, we develop innovative technologies that streamline operations and drive productivity.</p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-10 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                <Cpu className="w-16 h-16 mb-6 text-teal-400" />
                <h3 className="text-2xl font-semibold mb-4">AI & Technology Research</h3>
                <p className="text-lg">Conduct cutting-edge AI and technology research to stay ahead of industry trends. Our team of experts explores new frontiers in AI, developing breakthrough solutions that address complex problems and push the boundaries of what’s possible.</p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-10 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
                <Users className="w-16 h-16 mb-6 text-teal-400" />
                <h3 className="text-2xl font-semibold mb-4">AI Training & Competence Building</h3>
                <p className="text-lg">Equip your team with the skills and knowledge needed to excel in AI. Our comprehensive training programs are designed to enhance competencies, promote innovation, and ensure your workforce is prepared for the future of technology.

</p>
              </div>
            </div>
          </section>

          <section id="about" className="py-32">
            <h2 className="text-5xl font-bold mb-16 text-center">About <span style={{ color: '#0D9488' }}>Aiberg</span></h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl mb-8">
              At Aiberge, we blend the power of AI with bold creativity to tackle complex challenges and redefine innovation. Our passionate team of tech visionaries is dedicated to developing cutting-edge AI solutions that reshape industries and accelerate business evolution.
              </p>
              <p className="text-xl">
              We believe in user-first design combined with advanced, seamless technology. Our mission is to deliver software that do not just meet expectations but exceeds them—pushing boundaries and empowering our clients to stay ahead in the fast-changing digital landscape.
              </p>
            </div>
          </section>

          <section id="demo" className="py-32">
            <h2 className="text-5xl font-bold mb-16 text-center">Product <span style={{ color: '#0D9488' }}>Demo</span></h2>
            <div className="aspect-video max-w-5xl mx-auto bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden backdrop-blur-sm">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/50W4YeQdnSg?si=zNdtsbnLDd-Dx_6E"
                title="Product Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch Full Demo
              </Button>
            </div>
          </section>

          <section id="contact" className="py-32">
            <h2 className="text-5xl font-bold mb-16 text-center">
              {mode === 'contact' ? 'Get in Touch' : mode === 'demo' ? 'Register for Demo' : 'Book a Meeting'}
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <p className="text-sm text-center mb-2">⏳ 70% Capacity Reached – Join Your Peers Before It's Too Late!</p>
                <div className="relative w-full h-2 bg-[#3C4555] rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-teal-600 transition-all duration-1000 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-50 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="grid md:grid-cols-2">
                <div className="p-8 bg-teal-600">
                  {mode === 'contact' && (
                    <>
                      <h3 className="text-3xl font-semibold mb-6">Contact Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <Mail className="w-6 h-6" />
                          <span>contact.aiberg@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Phone className="w-6 h-6" />
                          <span>+212 060-3811137</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <MapPin className="w-6 h-6" />
                          <span> Tecknopark, casablanca, morocco</span>
                        </div>
                      </div>
                    </>
                  )}
                  {mode === 'demo' && (
                    <>
                      <h3 className="text-3xl font-semibold mb-6">Demo Information</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <CalendarIcon className="w-6 h-6" />
                          <span>Schedule your personalized demo</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Users className="w-6 h-6" />
                          <span>Learn from our expert team</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Cpu className="w-6 h-6" />
                          <span>Experience our AI technology firsthand</span>
                        </div>
                      </div>
                    </>
                  )}
                  {mode === 'meeting' && (
                    <>
                      <h3 className="text-3xl font-semibold mb-6">Meeting Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <CalendarIcon className="w-6 h-6" />
                          <span>Choose a convenient time</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Users className="w-6 h-6" />
                          <span>Meet with our team of experts</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Cpu className="w-6 h-6" />
                          <span>Discuss your specific needs and solutions</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-6">
                    {mode === 'contact' ? 'Send us a message' : mode === 'demo' ? 'Register for Demo' : 'Book a Meeting'}
                  </h3>
                  {mode === 'meeting' ? (
                    <div className="h-48">
                      <Calendar className="w-full h-full" />
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                          required
                          className="text-black placeholder:text-gray-500"
                        />
                      </div>
                      {mode === 'demo' && (
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" type="tel" placeholder="Your phone number" required />
                        </div>
                      )}
                      {mode === 'meeting' && (
                        <>
                          <div>
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" placeholder="Your role" required />
                          </div>
                          <div>
                            <Label htmlFor="companyType">Company or Person</Label>
                            <Select onValueChange={setCompanyType} value={companyType}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="company">Company</SelectItem>
                                <SelectItem value="individual">Individual</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {companyType === 'company' && (
                            <div>
                              <Label htmlFor="companyName">Company Name</Label>
                              <Input id="companyName" placeholder="Your company name" required />
                            </div>
                          )}
                          
                        </>
                      )}
                      <div>
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea 
                          id="message" 
                          placeholder={
                            mode === 'contact' 
                              ? "Your message" 
                              : mode === 'demo' 
                              ? "Any specific areas you'd like to see in the demo?" 
                              : "Any specific topics you'd like to discuss?"
                          }
                          className="text-black placeholder:text-gray-500"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                        {mode === 'contact' ? 'Send Message' : mode === 'demo' ? 'Register for Demo' : 'Book Meeting'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-8 text-center space-x-4">
              <Button 
                onClick={() => toggleMode('contact')} 
                variant={mode === 'contact' ? 'default' : 'outline'}
                className={mode === 'contact' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-transparent border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white'}
              >
                Contact Us
              </Button>
              <Button 
                onClick={() => toggleMode('demo')} 
                variant={mode === 'demo' ? 'default' : 'outline'}
                className={mode === 'demo' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-transparent border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white'}
              >
                Register for Demo
              </Button>
              <Button 
                onClick={() => toggleMode('meeting')} 
                variant={mode === 'meeting' ? 'default' : 'outline'}
                className={mode === 'meeting' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-transparent border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white'}
              >
                Book Meeting
              </Button>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 bg-opacity-50 py-8 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg">&copy; 2024 TechStartup. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}