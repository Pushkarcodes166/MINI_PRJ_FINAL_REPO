import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, FileText, User, Mail, Phone, MapPin, GraduationCap, Briefcase, Award, ArrowLeft, Download } from 'lucide-react';
import jsPDF from 'jspdf';

const ResumeBuilderPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: '',
    experience: '',
    skills: '',
    certifications: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Set font
    doc.setFont('helvetica');

    // Title
    doc.setFontSize(20);
    doc.text('Resume', 105, 20, { align: 'center' });

    let yPosition = 40;

    // Personal Information
    doc.setFontSize(16);
    doc.text('Personal Information', 20, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.text(`Name: ${formData.fullName}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Email: ${formData.email}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Phone: ${formData.phone}`, 20, yPosition);
    yPosition += 10;
    doc.text(`Address: ${formData.address}`, 20, yPosition);
    yPosition += 20;

    // Summary
    if (formData.summary) {
      doc.setFontSize(16);
      doc.text('Professional Summary', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      const summaryLines = doc.splitTextToSize(formData.summary, 170);
      doc.text(summaryLines, 20, yPosition);
      yPosition += summaryLines.length * 5 + 10;
    }

    // Education
    if (formData.education) {
      doc.setFontSize(16);
      doc.text('Education', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      const educationLines = doc.splitTextToSize(formData.education, 170);
      doc.text(educationLines, 20, yPosition);
      yPosition += educationLines.length * 5 + 10;
    }

    // Experience
    if (formData.experience) {
      doc.setFontSize(16);
      doc.text('Work Experience', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      const experienceLines = doc.splitTextToSize(formData.experience, 170);
      doc.text(experienceLines, 20, yPosition);
      yPosition += experienceLines.length * 5 + 10;
    }

    // Skills
    if (formData.skills) {
      doc.setFontSize(16);
      doc.text('Skills', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      const skillsLines = doc.splitTextToSize(formData.skills, 170);
      doc.text(skillsLines, 20, yPosition);
      yPosition += skillsLines.length * 5 + 10;
    }

    // Certifications
    if (formData.certifications) {
      doc.setFontSize(16);
      doc.text('Certifications', 20, yPosition);
      yPosition += 10;
      doc.setFontSize(12);
      const certLines = doc.splitTextToSize(formData.certifications, 170);
      doc.text(certLines, 20, yPosition);
    }

    // Save the PDF
    doc.save(`${formData.fullName}_resume.pdf`);
  };

  return (
    <>
      <Helmet>
        <title>Resume Builder - Career Guidance System</title>
        <meta name="description" content="Create a professional resume tailored to your career goals." />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20 animate-gradient" />

        <nav className="relative z-10 glass-effect border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate('/student-dashboard')} className="mr-4">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <BookOpen className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold gradient-text">Resume Builder</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-extrabold mb-4 gradient-text">
              Craft Your Professional Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Build a compelling resume that showcases your skills, experience, and potential. Download as PDF and stand out to employers.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-effect rounded-3xl p-8"
            >
              <form className="space-y-8">
                {/* Personal Information Section */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <User className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-white text-lg font-semibold mb-2 block">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white text-lg font-semibold mb-2 block flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white text-lg font-semibold mb-2 block flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-white text-lg font-semibold mb-2 block flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Professional Summary */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <Label htmlFor="summary" className="text-white text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Professional Summary
                  </Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    placeholder="Brief summary of your professional background and career goals"
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  />
                </motion.div>

                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <Label htmlFor="education" className="text-white text-lg font-semibold flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </Label>
                  <Textarea
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    placeholder="List your educational background, degrees, institutions, and graduation dates"
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  />
                </motion.div>

                {/* Work Experience */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  <Label htmlFor="experience" className="text-white text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Work Experience
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="Describe your work experience, including job titles, companies, dates, and key responsibilities"
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  />
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  <Label htmlFor="skills" className="text-white text-lg font-semibold">Skills</Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="List your technical and soft skills (comma-separated)"
                    rows={3}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  />
                </motion.div>

                {/* Certifications */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-4"
                >
                  <Label htmlFor="certifications" className="text-white text-lg font-semibold flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications
                  </Label>
                  <Textarea
                    id="certifications"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleInputChange}
                    placeholder="List your certifications, licenses, and professional development"
                    rows={3}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
                  />
                </motion.div>

                {/* Generate PDF Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-6"
                >
                  <Button
                    type="button"
                    onClick={generatePDF}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                  >
                    <Download className="w-5 h-5" />
                    Generate Resume PDF
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilderPage;
